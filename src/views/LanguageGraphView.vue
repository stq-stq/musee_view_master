<template>
    <div>
      <div ref="graph" id="graph"></div>
  
      <div id="dashBoard">
  
      </div>
  
      <div id="indicator"> <!-- 绘制图例 -->
        <!--    <el-button type="primary" @click="back" v-if="showBack">返回</el-button>-->
        <div v-if="showIndicator" v-for="(name, index) in labels" :key="index"> <!-- 利用item 遍历一个数组 利用index 遍历另外一个数组 -->
          <span
              :data-index="index"
              style="cursor: pointer;"
              :style="{ backgroundColor: nodeColors[index] }">
          </span>
          {{ name }}
        </div>
      </div>
    </div>
  </template>

<script>
import Axios from '@/axios/axiosPlugin';
// import dashBoard from '../components/LanguageGraph/dashBoard.vue'
import ForceGraph3D from '3d-force-graph'
import SpriteText from 'three-spritetext'
import {onMounted } from 'vue';


export default {
  name: 'ckGraph',
  data(){
    return{
      Graph: null,
      data: [],
      json: null,
      db: {
        uri: 'bolt://localhost:7689',
        user: 'neo4j',
        password: '19701975ASdf'
      },
      nodes: [],
      links: [],
      keyword: null,
      nodeSearch: [],
      linkSearch: [],
      nodeColors: ['#31d01a', '#ef5604', '#e8cb53', '#3670b5', '#a0e85e', '#ff5733', '#f5d300', '#23a6d5', '#ff8c00', '#9966cc'],
      labels: [],
      linkTypes: [],
      showIndicator: true,
      user : 'admin'
    }
  },
  mounted () {
    if(this.keyword) this.searchKeyWord()
    else this.getRecords()
  },
  methods: {
    getRecords(){
      // 发送 GET 请求到后端获取 JSON 数据
      Axios.get('/api/graph/record')
      .then(response => {
          console.log('请求成功，开始处理数据');
          this.json = response.data.data; // 从返回的数据中取出 json 数据
          console.log('获取到 JSON 数据并赋值给 this.json');
          this.keyword = JSON.parse(sessionStorage.getItem('key'));
          console.log('从 sessionStorage 中获取并解析 "key" 的值赋给 this.keyword');
          this.d3jsonParser(this.json);
          console.log('调用 d3jsonParser 方法处理 this.json');
          console.log("response");
          console.log(response);
      })
      .catch(error => {
          console.error('请求失败，处理错误');
          console.error('Error fetching records:', error);
      });
    },
    d3jsonParser (json) { // 解析json数据，主要负责数据的去重、标准化
      // 发送 POST 请求到后端
      Axios({
        method: 'POST',
        url   : '/api/graph/parseJson',
        data  :{
          json : json
        }
      }).then(response => {
          console.log('获取到后端响应');
          console.log(response);
          console.log('开始处理后端响应');
          this.data = response.data.data;
          console.log('获取到的数据:', this.data);
          // this.data = this.data.replace(/'/g, '"');
          console.log('尝试数据转换操作（注释部分）');
          // this.data = JSON.parse(this.data);
          this.initData();
          console.log('调用初始化数据方法');
          sessionStorage.setItem('key', JSON.stringify(''));
          console.log('将键"key"的值设置为空字符串并存储到 sessionStorage 中');
      })
      .catch(error => {
          console.error('发送请求时出错:');
          console.error('Error sending request:', error);
      });
    },
    initData () {
      this.nodes = this.data.nodes
      this.links = this.data.links
      this.nodeSearch = this.data.nodes
      this.linkSearch = this.data.links
      this.labels = this.data.labels
      this.linkTypes = this.data.linkTypes
      if(this.keyword) this.searchKeyWord()
      else this.renderData()
    },
    insertLineBreaks(text, every){
      var result = "";
      for (var i = 0; i < text.length; i++) {
          result += text[i];
          if ((i + 1) % every === 0) {
              result += "\n";
          }
      }
      return result;
    },
    searchKeyWord () {
      console.log("search:start!!!!!!----------------------------------------")

      let key = this.keyword
      let node_temp = null
      let ganLian = []
      let nodeSet = []
      this.nodeSearch = []
      this.linkSearch = []

      // 添加节点
      for (let i = 0; i < this.nodes.length; i++) {
        if (this.nodes[i].properties.name.indexOf(key) >= 0) {
          node_temp = this.nodes[i];
          nodeSet.push(this.nodes[i].id)
          this.nodeSearch.push(this.nodes[i]);
          break;
        }
      }

      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = 0; j < this.links.length; j++) {
          // let sourceId = null
          // let targetId = null
          // if(this.links[j].source.id !== null) sourceId = this.links[j].source.id;
          // else sourceId = this.links[j].source;
          // if(this.links[j].target.id !== null) targetId = this.links[j].target.id;
          // else targetId = this.links[j].target;
          //
          // if (sourceId === this.nodes[i].id && targetId === node_temp.id && nodeSet.indexOf(this.nodes[i].id) === -1) {
          //   nodeSet.push(this.nodes[i].id);
          //   this.nodeSearch.push(this.nodes[i]);
          // }
          // if (targetId === this.nodes[i].id && sourceId === node_temp.id && nodeSet.indexOf(this.nodes[i].id) === -1) {
          //   nodeSet.push(this.nodes[i].id);
          //   ganLian.push(this.nodes[i]);
          //   this.nodeSearch.push(this.nodes[i]);
          // }
          if (this.links[j].source === this.nodes[i].id && this.links[j].target === node_temp.id && nodeSet.indexOf(this.nodes[i].id) === -1) {
            nodeSet.push(this.nodes[i].id);
            this.nodeSearch.push(this.nodes[i]);
          }
          if (this.links[j].target === this.nodes[i].id && this.links[j].source === node_temp.id && nodeSet.indexOf(this.nodes[i].id) === -1) {
            nodeSet.push(this.nodes[i].id);
            ganLian.push(this.nodes[i]);
            this.nodeSearch.push(this.nodes[i]);
          }
        }
      }
      console.log(ganLian)
      for (let j = 0; j < ganLian.length; j++) {
        for (let i = 0; i < this.links.length; i++) {
          if(this.links[i].target === ganLian[j].id /*&& this.links[i].type === "包含"*/){
            for (let k = 0; k < this.nodes.length; k++) {
              if (this.links[i].source === this.nodes[k].id && nodeSet.indexOf(this.nodes[k].id) === -1) {
                nodeSet.push(this.nodes[k].id);
                this.nodeSearch.push(this.nodes[k]);
              }
            }
          }
        }
      }

      // 添加关系
      this.links.filter(link => { // 遍历保留节点的关联关系
        if (link.source === node_temp.id || link.target === node_temp.id){
          this.linkSearch.push(link);
          return true;
        }

        for (let j = 0; j < ganLian.length; j++){
          if(link.target === ganLian[j].id /* && link.type === "包含"*/){
            this.linkSearch.push(link);
            return true;
          }
        }
      })

      this.renderData()
    },
    renderData () {
      console.log("renderData:start!!!!!------------------------------------------------")
      console.log(this.nodeSearch)
      console.log(this.linkSearch)

      this.Graph = ForceGraph3D()(this.$refs.graph).graphData({ nodes: this.nodeSearch, links: this.linkSearch })
          .backgroundColor('#FFFFFF').width(1741).height(800).showNavInfo(false)
          .nodeOpacity(0.65)
          .nodeVal(node =>{
            let size =95
            for(let i = 0; i < this.labels.length; i++)
              if(node.label === this.labels[i])
                size = size + i * 7;
            return size
          })
          .nodeColor(node => {
            let i = 0
            for (;i < this.labels.length;i++)
              if (node.label === this.labels[i])
                break
            return this.nodeColors[i]
          })
          .nodeThreeObjectExtend(true)
          .nodeThreeObject(node => {
            let name = node.properties.name
            
            for(let j=1 ; j<= name.length/5 ; j++){
              name = name = name.substring((j-1)*5,j*5) + "\n" + name.substring(j*5)
            }

            const sprite = new SpriteText(name)
            sprite.material.depthWrite = false
            let i = 0
            for (;i < this.labels.length;i++)
              if (node.label === this.labels[i])
                break
            sprite.color = '#000000'
            sprite.textHeight = 6
            return sprite
          })
          .nodeLabel(node => `${node.properties.name}`)
          .onNodeHover(node => this.$refs.graph.style.cursor = node ? 'pointer' : null)
          .onNodeClick((node, event) => {
            const distance = 40;
            const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
            const newPos = node.x || node.y || node.z
                ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
                : { x: 0, y: 0, z: distance };
            this.Graph.cameraPosition(newPos, node, 3000);

            this.selectNodeData = {}
            this.$set(this.selectNodeData, 'label', node.label);
            this.$set(this.selectNodeData, 'id', node.id);
            this.$set(this.selectNodeData, 'name', node.properties.name);
            let i = 0
            for (;i < this.labels.length;i++)
              if (node.label === this.labels[i])
                break
            this.$set(this.selectNodeData, 'color', this.nodeColors[i]);
            this.$set(this.selectNodeData, 'properties', node.properties);
          })
          .linkOpacity(0.5)
          .linkVisibility(true)
          .linkDirectionalArrowLength(4.5)
          .linkDirectionalArrowRelPos(1)
          .linkCurvature(0.25)
          .linkWidth(1)
          // .linkAutoColorBy(r => r.type)
          .linkColor(link => {
            let i = 0
            for (;i < this.linkTypes.length;i++)
              if (link.type === this.linkTypes[i])
                break
            return this.nodeColors[i]
          })
          .linkThreeObjectExtend(true)
          .linkThreeObject(link => {
            const sprite = new SpriteText(`${link.type}`);
            for (let i = 0;i < this.linkTypes.length;i++)
              if (link.type === this.linkTypes[i])
                sprite.color = this.nodeColors[i]

            sprite.textHeight = 7;
            sprite.fontWeight = "bold";
            return sprite;
          })
          .linkLabel(r => r.type)
          .onLinkClick((link, event) => {
            console.log(link.type)
          })
          .linkPositionUpdate((sprite, { start, end }) => {
            const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
              [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
            })))
            // Position sprite
            Object.assign(sprite.position, middlePos);
          })
          .linkDirectionalParticles(20)
          .linkDirectionalParticleSpeed(d => 20 * 0.001);

      this.Graph.d3Force('charge').strength(-230) // this.Graph.d3Force('link').distance(this.space);
    },
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 1200px){
  #info, #indicator {
    display: none !important;
  }
}

#graph{
  border-radius: 5px;
  background-color: white;
  //height: 764px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#indicator {
  position: absolute;
  left: 50px;
  bottom: 30px;
  text-align: left;
  color: #f2f2f2;
  font-size: 14px;
  font-weight: bold;
  & > div {
    margin-bottom: 4px;
  }
  span {
    display: inline-block;
    width: 32px;
    height: 16px;
    position: relative;
    top: 2px;
    margin-right: 8px;
  }
}

#Component{
  position: absolute;
  right: 150px;
  bottom: 20px;
  text-align: left;
  color: #f2f2f2;
  font-size: 14px;
  font-weight: bold;
  & > div {
    margin-bottom: 4px;
  }
  span {
    display: inline-block;
    width: 32px;
    height: 16px;
    position: relative;
    top: 2px;
    margin-right: 8px;
  }
}


#dashBoard {
  position: absolute;
  font-size: 16px;
  top: 30px;
  right: 20px;
  width: 300px;
  .node-card {
    border: 1px solid #9faecf;
    background-color: #00aeff6b;
    color: #fff;
    text-align: left;
    .el-card__header {
      border-bottom: 1px solid #50596d;
    }
  }
}
</style>
