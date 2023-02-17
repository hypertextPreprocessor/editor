import React from 'react';
import * as ReactDOM from 'react-dom/client';
import Quill from 'quill/core';
import Toolbar from 'quill/modules/toolbar';
import Table from 'quill/modules/table';
import Snow from 'quill/themes/snow';
import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Header from 'quill/formats/header';
import {ColorStyle} from 'quill/formats/color';
import {BackgroundStyle} from 'quill/formats/background';
import {FontStyle} from 'quill/formats/font';
import CodeBlock,{Code} from 'quill/formats/code';
import Link from 'quill/formats/link';
import {SizeClass} from 'quill/formats/size';
import Strike from 'quill/formats/strike';
import Script from 'quill/formats/script';
import Underline from 'quill/formats/underline';
import Blockquote from 'quill/formats/blockquote';
import IndentClass from 'quill/formats/indent';
import ListItem from 'quill/formats/list';
import {AlignStyle} from 'quill/formats/align';
import {DirectionStyle} from 'quill/formats/direction';
import Formula from 'quill/formats/formula';
import Video from 'quill/formats/video';
import Image from 'quill/formats/image';
import Syntax from 'quill/modules/syntax';
import QuillBetterTable from 'quill-better-table'
import '../node_modules/quill/dist/quill.snow.css';
import 'highlight.js/styles/default.css';
import 'quill-better-table/dist/quill-better-table.css';
class RootElement extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          row:3,
          col:3,
          html:'',
          fixedMenu1:{},
          fixedMenu2:{}
        };
        this.editor = React.createRef();
    }
    handleHTMLFormat(){
      var content = document.querySelector('#editor');
      var copyContent = content.cloneNode(true);
      copyContent.querySelector('.ql-tooltip').parentNode.removeChild(copyContent.querySelector('.ql-tooltip'));
      var arr = copyContent.querySelectorAll('select.ql-ui');
      for(var i=0;i<arr.length;i++){
        arr[i].parentNode.removeChild(arr[i]);
      }
      var brr = copyContent.querySelectorAll('colgroup');
      for(var j=0;j<brr.length;j++){
        brr[j].parentNode.removeChild(brr[j]);
      }
      var output = copyContent.outerHTML.replaceAll(/<br>/ig,'<br/>').replaceAll('&nbsp;','&#160;');
      return output;
    }
    componentDidMount() {
            //var syntax = new Syntax(Quill,{hljs:hljs,languages:['javascript'],inter});
            //window.hljs = hljs;//highlight;
            //hljs.highlightAll();
            Quill.register({
                'modules/toolbar': Toolbar,
                'modules/syntax':Syntax,
                'modules/table':Table,
                'themes/snow': Snow,
                'formats/bold': Bold,
                'formats/italic': Italic,
                'formats/header': Header,
                'formats/color': ColorStyle,
                'formats/background':BackgroundStyle,
                'formats/font':FontStyle,
                //'formats/code-block':CodeBlock,
                'formats/code':Code,
                'formats/link':Link,
                'formats/size':SizeClass,
                'formats/strike':Strike,
                'formats/script':Script,
                'formats/underline':Underline,
                'formats/blockquote':Blockquote,
                'formats/indent':IndentClass,
                'formats/list':ListItem,
                'formats/align':AlignStyle,
                'formats/direction':DirectionStyle,
                'formats/video':Video,
                'formats/image':Image,
                'formats/formula':Formula,
                'modules/better-table': QuillBetterTable
            });
            var quill = new Quill(this.editor.current,{
                theme:'snow',
                modules: {
                    table:false,
                    'better-table': {
                      operationMenu: {
                        items: {
                          unmergeCells: {
                            text: 'Another unmerge cells name'
                          }
                        },
                        color: {
                          colors: [
                            '#fff', 'red', 'rgb(0, 0, 0)','#dedede','#ff9800','antiquewhite',
                            'aliceblue','aqua','beige','cadetblue','chocolate','cornflowerblue',
                            '#99167f','#5969b0','#aeb8e4','#69950c','#bdd689','#89d6bb'
                          ],  // colors in operationMenu
                          text: 'Background Colors'  // subtitle
                        } 
                      }
                    },
                    keyboard: {
                      bindings: QuillBetterTable.keyboardBindings
                    },
                    syntax:true,// (text) => hljs.highlightAuto(text).value, 
                    toolbar: '#toolbar-container'
                }
            });
            this.setState({quill:quill});
        window.addEventListener('scroll',()=>{
          if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
            this.setState({
              fixedMenu1:{
                position:'fixed',
                width:'100%',
                background:'#ffffff',
                top:0,
                zIndex:2,
              },
              fixedMenu2:{
                position:'fixed',
                width:'100%',
                background:'#ffffff',
                top:23,
                zIndex:3,
              }
            })
          }else{
            this.setState({
              fixedMenu1:{},
              fixedMenu2:{}
            })
          }
        });
    }
    render(){
      const tableCtl = {display:'inline-block',width:'30px',height:'30px',position:'relative'}
      const tableInsUp = {
        position:'absolute',
        top:0,
        left:'10px',
        borderTop: '0px solid transparent',
        borderLeft: '5px solid transparent',
        width:0,
        borderRight:  '5px solid transparent',
        height: 0,
        borderBottom: '10px solid #666666',
        cursor:'pointer',
        padding: 0,
        margin: 0
      }
      const tableInsLeft = {
        position:'absolute',
        top:'10px',
        left:0,
        width:0,height:0,
        borderLeft:'0px solid transparent',
        borderTop:'5px solid transparent',
        borderBottom:'5px solid transparent',
        borderRight:'10px solid #666666',
        cursor:'pointer',
        padding: 0,
        margin: 0
      }
      const tableInsRight = {
        position:'absolute',
        top:'10px',
        right:0,
        width:0,height:0,
        borderRight:'0px solid transparent',
        borderTop:'5px solid transparent',
        borderBottom:'5px solid transparent',
        borderLeft:'10px solid #666666',
        cursor:'pointer',
        padding: 0,
        margin: 0
      }
      const tableInsDown = {
        position:'absolute',
        bottom:0,
        left:'10px',
        width:0,height:0,
        borderBottom:'0px solid transparent',
        borderLeft:'5px solid transparent',
        borderRight:'5px solid transparent',
        borderTop:'10px solid #666666',
        cursor:'pointer',
        padding: 0,
        margin: 0
      }
        return <>
        <div style={this.state.fixedMenu1}>
            竖（row）<input type="number" onChange={(v)=>{
            this.setState({row:Number(v.target.value)})
          }}/>x
          横（col）<input type="number" onChange={(v)=>{
            this.setState({col:Number(v.target.value)})
        }}/>
        </div>
<div id="toolbar-container" style={this.state.fixedMenu2}>
    <span class="ql-formats">
      <select class="ql-font"></select>
      <select class="ql-size"></select>
      {/*
      <div style={tableCtl}>
        <button style={tableInsUp} onClick={()=>{
          var table = new Table(this.state.quill);
          table.insertRowAbove();
      }}></button>
        <button style={tableInsLeft} onClick={()=>{
          var table = new Table(this.state.quill);
          table.insertColumnLeft();
      }}></button>
        <button style={tableInsRight} onClick={()=>{
          var table = new Table(this.state.quill);
          table.insertColumnRight();
      }}></button>
        <button style={tableInsDown} onClick={()=>{
          var table = new Table(this.state.quill);
          table.insertRowBelow();
      }}></button>
      </div>
      <button class="ql-table"></button>
    */}
    <button class="ql-better-table" onClick={()=>{
      let tableModule = this.state.quill.getModule('better-table')
      var row = this.state.row;
      var col = this.state.col;
      console.log(row,col);
      console.log(typeof row,typeof col);
      tableModule.insertTable(row,col);
    }}>T</button>
    </span>
    <span class="ql-formats">
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>
      <button class="ql-strike"></button>
    </span>
    <span class="ql-formats">
      <select class="ql-color"></select>
      <select class="ql-background"></select>
    </span>
    <span class="ql-formats">
      <button class="ql-script" value="sub"></button>
      <button class="ql-script" value="super"></button>
    </span>
    <span class="ql-formats">
      <button class="ql-header" value="1"></button>
      <button class="ql-header" value="2"></button>
      <button class="ql-header" value="3">H<sub>3</sub></button>
      <button class="ql-header" value="4">H<sub>4</sub></button>
      <button class="ql-header" value="5">H<sub>5</sub></button>
      <button class="ql-header" value="6">H<sub>6</sub></button>
      <select class="ql-header"></select>
      <button class="ql-blockquote"></button>
      <button class="ql-code-block"></button>
      <button class="ql-code"></button>
    </span>
    <span class="ql-formats">
      <button class="ql-list" value="ordered"></button>
      <button class="ql-list" value="bullet"></button>
      <button class="ql-indent" value="-1"></button>
      <button class="ql-indent" value="+1"></button>
    </span>
    <span class="ql-formats">
      <button class="ql-direction" value="rtl"></button>
      <select class="ql-align"></select>
    </span>
    <span class="ql-formats">
      <button class="ql-link"></button>
      <button class="ql-image"></button>
      <button class="ql-video"></button>
      <button class="ql-formula"></button>
    </span>
    <span class="ql-formats">
      <button class="ql-clean"></button>
    </span>
  </div>
            <div id="editor" ref={this.editor} style={{minHeight:700}}></div>
            <button id="getHtmlForXhtml" onClick={()=>{
             var output = this.handleHTMLFormat();
              this.setState({html:output});
            }}>获取HTML</button>
            <button onClick={()=>{
              var output = this.handleHTMLFormat();
               navigator.clipboard.writeText(output).then(function() {
                /* clipboard successfully set */
                alert('成功复制');
              }, function() {
                /* clipboard write failed */
                alert('无法复制');
              });
            }}>复制</button>
            <div>{this.state.html}</div>
        </>
    }
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<RootElement/>);