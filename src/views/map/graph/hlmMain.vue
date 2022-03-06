<template>
  <div>
    <div style="height:110px;padding-top:6px;padding-left: 30px;padding-right:30px;border-bottom: #efefef solid 1px;color: #555555;font-size: 12px;">
      <!-- <el-button type="success" class="c-show-code-button"><el-link href="https://github.com/seeksdream/relation-graph/blob/master/doc/demo/Demo4AdvDataFilter.vue" target="_blank" style="color: #ffffff;">查看代码</el-link></el-button> -->
      <div style="">
        <!-- <div style="">节点筛选：</div> -->
        <el-radio-group v-model="checked_sex" size="mini" @change="doFilter">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="男"></el-radio-button>
          <el-radio-button label="女"></el-radio-button>
        </el-radio-group>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-radio-group v-model="checked_isgoodman" size="mini" style="margin-left:50px;" @change="doFilter">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button :label="true">正面人物</el-radio-button>
          <el-radio-button :label="false">反面人物</el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <!-- <div style="line-height: 20px;">关系筛选：</div> -->
        <el-checkbox-group v-model="rel_checkList" @change="doFilter">
          <el-checkbox v-for="thisItem in all_rel_type" :key="thisItem" :label="thisItem" />
        </el-checkbox-group>
      </div>
    </div>
    <div ref="myPage" style="margin-top:0px;width: calc(100% - 10px);height:calc(100vh - 200px);">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" >

      </SeeksRelationGraph>
    </div>
    <!--节点详情悬浮框-->
    <div v-if="isShowNodeTipsPanel" :style="{left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }" style="z-index: 999;padding:10px;background-color: #ffffff;border:#eeeeee solid 1px;box-shadow: 0px 0px 8px #cccccc;position: absolute;">
      <div style="line-height: 25px;padding-left: 10px;color: #888888;font-size: 12px;">人物名称：{{currentNode.text}}</div>
      <div class="c-node-menu-item">性别:{{currentNode.text}}</div>
      <div class="c-node-menu-item">年龄:{{currentNode.text}}</div>
      <div class="c-node-menu-item">住址:{{currentNode.text}}</div>
      <div class="c-node-menu-item">简介:{{currentNode.text}}</div>
    </div>

  </div>
</template>

<script>
import SeeksRelationGraph from 'relation-graph'
export default {
  name: 'SeeksRelationGraphDemo',
  components: { SeeksRelationGraph },
  data () {
    return {
      param: {
        queryName: '',
        pageNum: 1, // 初始页
        pageSize: 100 // 每页的数据
      },
      hlmInfoData: [],
      hlmRelData: [],
      hlmInfoTotal: 0,
      hlmRelTotal: 0,
      // ----------------------------------------------------------------------------------
      // ----------------------------节点详情悬浮框------------------------------------------
      isShowNodeTipsPanel: false, // 默认隐藏
      nodeMenuPanelPosition: { x: 0, y: 0 }, // 初始坐标
      currentNode: {}, // 悬浮框内容对象
      // ----------------------------------------------------------------------------------

      g_loading: true,
      demoname: '---',
      checked_sex: '',
      checked_isgoodman: '',
      rel_checkList: ['师生', '上下级', '亲戚', '情人', '朋友', '夫妻', '勾结', '腐化', '举报'],
      all_rel_type: ['师生', '上下级', '亲戚', '情人', '朋友', '夫妻', '勾结', '腐化', '举报'],
      graphOptions: {
        layoutName: 'tree',
        from: 'top',
        layoutClassName: 'seeks-layout-center',
        defaultNodeBorderWidth: 0,
        defaultNodeColor: 'rgba(238, 178, 94, 1)',
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: 'tb', // 默认的连线与节点接触的方式（border:边缘/ltrb:上下左右/tb:上下/lr:左右）当布局为树状布局时应使用tb或者lr，这样才会好看
        defaultLineShape: 4, // 4：折线

        'layouts': [
          {
            'label': '自动',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-center',
            'min_per_width': 10,
            // 'max_per_width': 50,
            'min_per_height': 180
            // 'max_per_height': 1000,
            // 'levelDistance': 1100
          },
          {
            'label': '树状',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-center',
            'useLayoutStyleOptions': true,
            'from': 'top',
            'defaultNodeBorderWidth': 0,
            'defaultNodeColor': 'rgba(238, 178, 94, 1)',
            'allowSwitchLineShape': true,
            'allowSwitchJunctionPoint': true,
            'defaultJunctionPoint': 'lr', // 默认的连线与节点接触的方式（border:边缘/ltrb:上下左右/tb:上下/lr:左右）当布局为树状布局时应使用tb或者lr，这样才会好看
            'defaultLineShape': 4,

            'min_per_width': 40,
            'max_per_width': 70,
            'min_per_height': 200
          }
        ]

        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    }
  },
  created () {
  },
  mounted () {
    this.demoname = this.$route.params.demoname
    this.initInfo()
  },
  methods: {
    // 初始化人物数据
    initInfo () {
      var _this = this
      let donHlmInfoEntity = {
        queryName: this.param.queryName
      }
      var url = '/api/web/hlmInfo/query'
      this.$axios.post(url, donHlmInfoEntity).then(res => {
        if (res.data.code == '100200') {
          this.hlmInfoData = res.data.object.list
          this.hlmInfoTotal = res.data.object.total
          this.initRel()
        } else {
          this.$message({message: res.data.msg, type: 'error'})
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 初始化人物关系
    initRel () {
      var _this = this
      let donHlmRelEntity = {
        queryName: this.param.queryName
      }
      var url = '/api/web/hlmRel/query'
      this.$axios.post(url, donHlmRelEntity).then(res => {
        if (res.data.code == '100200') {
          this.hlmRelData = res.data.object.list
          this.hlmRelTotal = res.data.object.total
          this.setGraphData()
        } else {
          this.$message({message: res.data.msg, type: 'error'})
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // -------------------------------------------------------------------------------------------
    setGraphData () {
      console.log('hlmInfoData---', this.hlmInfoData)
      var newData = { rootId: 'J001', links: [], nodes: [] }
      // 人物数据处理
      for (var i = 0; i < this.hlmInfoData.length; i++) {
        if (this.hlmInfoData[i].sex == 'M') {
          var objM = {
            id: this.hlmInfoData[i].userId,
            text: this.hlmInfoData[i].userName,
            color: 'rgba(0, 206, 209, 1)',
            borderColor: '#6cc0ff',
            innerHTML: '<div slot="node" slot-scope="{node}" @mouseover="showNodeTips(node, $event)" @mouseout="hideNodeTips(node, $event)"><div class="c-my-node" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3098576865,849900134&fm=58&app=83&f=JPEG?w=250&h=250&s=EDE01A63A65917DC104509920300C0C1);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">' + this.hlmInfoData[i].userName + '</div></div></div>',
            data: {
              isGoodMan: true,
              sexType: '男'
            }
          }
          newData.nodes.push(objM)
        } else {
          var objF = {
            id: this.hlmInfoData[i].userId,
            text: this.hlmInfoData[i].userName,
            color: '#ec6941',
            borderColor: '#ff875e',
            innerHTML: '<div class="c-my-node" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3749144697,3456463661&fm=58&app=83&f=JPEG?w=250&h=250&s=783823D3FE621E94138CC08B030070C2);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">' + this.hlmInfoData[i].userName + '</div></div>',
            data: {
              isGoodMan: true,
              sexType: '女'
            }
          }
          newData.nodes.push(objF)
        }
      }
      // 人物关系数据处理
      for (var j = 0; j < this.hlmRelData.length; j++) {
        var objRel = {
          from: this.hlmRelData[j].fromId,
          to: this.hlmRelData[j].toId,
          text: this.hlmRelData[j].relName,
          color: '#d2c0a5',
          fontColor: '#d2c0a5',
          data: {
            relName: this.hlmRelData[j].relName,
            relType: this.hlmRelData[j].relType,
            relLevel: this.hlmRelData[j].relLevel,
            relStatus: this.hlmRelData[j].relStatus,
            relRemark: this.hlmRelData[j].relRemark
          }
        }
        newData.links.push(objRel)
      }

      console.log('newData---', newData)

      this.$refs.seeksRelationGraph.setJsonData(newData, (seeksRGGraph) => {
        // 这些写上当图谱初始化完成后需要执行的代码
        this.fqAction()
      })
    },
    // 鼠标点击节点触发
    onNodeClick (nodeObject, $event) {
      if (this.isShowNodeTipsPanel == true) {
        this.isShowNodeTipsPanel = false
      } else {
        console.log('onNodeClick:', nodeObject)
        this.currentNode = nodeObject
        var _base_position = this.$refs.myPage.getBoundingClientRect()
        this.isShowNodeTipsPanel = true
        this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x + 280
        this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y + 180
      }
    },
    // 鼠标点击关系触发
    onLineClick (lineObject, $event) {
      console.log('onLineClick:', lineObject)
    },
    // 鼠标悬浮节点触发
    showNodeTips (nodeObject, $event) {
      this.currentNode = nodeObject
      var _base_position = this.$refs.myPage.getBoundingClientRect()
      console.log('showNodeMenus:', $event, _base_position)
      this.isShowNodeTipsPanel = true
      this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x + 10
      this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y + 10
    },
    // 鼠标悬浮节点离开隐藏
    hideNodeTips (nodeObject, $event) {
      this.isShowNodeTipsPanel = false
    },

    // 夫妻头像自动靠近
    fqAction () {
      // 拿到妻子节点
      var graph = this.$refs.seeksRelationGraph
      for (var i = 0; i < this.hlmInfoData.length; i++) {
        if (this.hlmInfoData[i].sex == 'F') {
          var nodeQ = graph.getNodeById(this.hlmInfoData[i].userId)
          // 根据关系，找到丈夫节点
          var nodeFid = ''
          var linkLevel = ''

          for (var j = 0; j < this.hlmRelData.length; j++) {
            if (this.hlmRelData[j].toId == nodeQ.id && this.hlmRelData[j].relType == 'FQ') {
              nodeFid = this.hlmRelData[j].fromId
              linkLevel = this.hlmRelData[j].relLevel
              break
            }
          }
          // 根据丈夫坐标、结合妻子等级、设置妻子坐标
          if (nodeFid != '') {
            var nodeF = graph.getNodeById(nodeFid)
            // 直接改变位置
            nodeQ.x = nodeF.x + linkLevel * 70
            nodeQ.y = nodeF.y
          }
        }
      }
      // 隐藏夫妻关系线
      var allLines = this.$refs.seeksRelationGraph.getLines()
      allLines.forEach(thisLine => {
        thisLine.relations.forEach(thisLink => {
          if (thisLink.data['relType'] === 'FQ') {
            thisLink.isHide = true
          } else {
            thisLink.isHide = false
          }
        })
      })
    },

    doFilter () {
      var allNodes = this.$refs.seeksRelationGraph.getNodes()
      var allLines = this.$refs.seeksRelationGraph.getLines()
      allNodes.forEach(thisNode => {
        var _isHideThisLine = false
        if (this.checked_sex !== '') {
          if (thisNode.data['sexType'] !== this.checked_sex) {
            _isHideThisLine = true
          }
        }
        if (this.checked_isgoodman !== '') {
          if (thisNode.data['isGoodMan'] !== this.checked_isgoodman) {
            _isHideThisLine = true
          }
        }
        thisNode.opacity = _isHideThisLine ? 0.1 : 1
      })
      allLines.forEach(thisLine => {
        // 注意这里的line和json数据中link不一样，一条线（line）上可以附着多条关系(link),可以通过line.relations获取到这条线上所有的关系数据(link)
        var _isHideThisLine = true
        thisLine.relations.forEach(thisLink => {
          if (this.rel_checkList.indexOf(thisLink.data['type']) === -1) {
            thisLink.isHide = true
          } else {
            _isHideThisLine = false
            thisLink.isHide = false
          }
        })
        // thisNode.opacity = _isShowThisNode ? 1 : 0.1
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .c-my-node{
    background-position: center center;
    background-size: 100%;
    border:#ff8c00 solid 2px;
    height:80px;/*圆高*/
    width:80px;/*圆宽*/
    border-radius: 40px;
  }
  .c-node-name{
    width:160px;/*姓名宽度*/
    margin-left:-40px;/*姓名偏移*/
    text-align:center;
    margin-top:65px;
  }
  /*悬浮框css*/
.c-node-menu-item{
  line-height: 30px;padding-left: 10px;cursor: pointer;color: #444444;font-size: 14px;border-top:#efefef solid 1px;
}
.c-node-menu-item:hover{
  background-color: rgba(66,187,66,0.2);
}
</style>
