import React from 'react';
import * as ReactDOM from 'react-dom/client';
import Quill from 'quill'
import QuillBetterTable from 'quill-better-table'

import hljs from 'highlight.js';
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/github.css";
import "quill-better-table/dist/quill-better-table.css";
import "./custom.css"
class RootElement extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          quill:null,
          tableRowNum:3,
          tableColumnNum:3,
          html:'',
          fixedMenu:{}
        };
        this.editor = React.createRef();
        this.toolbar = React.createRef();
    }
    initEditor(){
      hljs.highlightAll();
      Quill.register({
          'modules/better-table': QuillBetterTable,
          //'modules/syntax': Syntax,
      }, true)
      var quill = new Quill(this.editor.current,{
        modules: { 
          toolbar:this.toolbar.current,
          syntax:{
              hljs:()=>hljs,
              languages:[
                { key: 'plain', label: 'Plain' },
                { key: 'bash', label: 'Bash' },
                { key: 'c', label: 'C' },
                { key: 'cpp', label: 'C++' },
                { key: 'cs', label: 'C#' },
                { key: 'css', label: 'CSS' },
                { key: 'scss', label: 'SCSS' },
                { key: 'cmd', label: 'DOS' },
                { key: 'shell', label: 'Shell' },
                { key: 'coffeescript', label: 'CoffeeScript' },
                { key: 'diff', label: 'Diff' },
                { key: 'dart', label: 'Dart' },
                { key: 'go', label: 'GO' },
                { key: 'xml', label: 'HTML/XML' },
                { key: 'json', label: 'JSON' },
                { key: 'java', label: 'Java' },
                { key: 'javascript', label: 'Javascript' },
                { key: 'kt', label: 'Kotlin' },
                { key: 'lisp', label: 'Lisp' },
                { key: 'lua', label: 'Lua' },
                { key: 'markdown', label: 'Markdown' },
                { key: 'nginx', label: 'Nginx' },
                { key: 'objectivec', label: 'Objective C' },
                { key: 'glsl', label: 'OpenGL Shading Language' },
                { key: 'php', label: 'PHP' },
                {key: 'pl', label: 'Perl' },
                { key: 'python', label: 'Python' },
                { key: 'ruby', label: 'Ruby' },
                { key: 'rust', label: 'Rust' },
                { key: 'sql', label: 'SQL' },
                { key: 'swift', label: 'Swift' },
                {key:'pgsql',label:'PostgreSQL'},
                {key:'typescript',label:'TypeScript'},
                {key:'vbscript',label:'VBScript'},
                {key:'yml',label:'YAML'}
                
              ]
          },
          table: false,
          'better-table':{
              operationMenu: {
                  items: {
                      insertColumnRight:{
                          text:"右侧插入一列"
                      },
                      insertColumnLeft:{
                          text:"左侧插入一列"
                      },
                      insertRowUp:{
                          text:"上方插入一行"
                      },
                      insertRowDown:{
                          text:"下方插入一行"
                      },
                      deleteColumn:{
                          text:"删除所选列"
                      },
                      deleteRow:{
                          text:"删除所选行"
                      },
                      deleteTable:{
                          text:"删除表格"
                      },
                      mergeCells:{
                          text:"合并所选单元格"
                      },
                      unmergeCells: {
                          text: '拆分所选单元格'
                      }
                  },
                  color: {
                      text:'背景颜色',
                      colors: ['red', 'green', 'yellow', '#f7f7f7','#dbdbdb', 'gray', '#333333', '#666666', '#999999','#d98c8c','#000000','#2d6024','#d3c352','#7e52d3','#8ad5e1','#090d40','#578d88','#75762b','#f5c4c4','#1ad5ff','#c5d352']
                  }
              }
          },
          keyboard: {
              bindings: QuillBetterTable.keyboardBindings
          }
      },
        theme: 'snow'
      })
      this.setState({quill});
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
        this.initEditor();
        window.addEventListener('scroll',()=>{
          if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
            this.setState({
              fixedMenu:{
                position:'fixed',
                width:'100%',
                background:'#ffffff',
                top:0,
                zIndex:2,
              }
            })
          }else{
            this.setState({fixedMenu:''});
          }
        });
    }
    forbidEmptyALl(value){
      value = String(value);
      return value.match(/\s/g)!=null&&value.match(/\s/g).length === value.length
  }
    createTable(){
      if(this.state.tableRowNum ==="" || this.state.tableColumnNum ===""){
          alert("表格行或列不能为空");
      }else if(this.forbidEmptyALl(this.state.tableRowNum) || this.forbidEmptyALl(this.state.tableColumnNum)){
          alert("表格行或列不能为空");
      }else{
          if(Object.is(Number(this.state.tableRowNum),NaN)||Object.is(Number(this.state.tableColumnNum),NaN)){
             alert("表格行或列只能填入数字");
          }else{
              let tableModule = this.state.quill.getModule('better-table');
              tableModule.insertTable(Number(this.state.tableRowNum),Number(this.state.tableColumnNum));
          }
      }
  }
    render(){
        return <>
            <div id="toolbar" ref={this.toolbar} style={{...this.state.fixedMenu}}>
    <select className="ql-font"></select>
    <select className="ql-size">
        <option value="small"></option>
        <option defaultValue></option>
        <option value="large"></option>
        <option value="huge"></option>
    </select>
    <button className="ql-blockquote"></button>
    <button className="ql-code"></button>
    <button className="ql-code-block"></button>
    <select className="ql-header">
        <option defaultValue></option>
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
    </select>
    <span className="ql-formats">
        <button className="ql-link"></button>
        <select className="ql-color"></select>
        <select className="ql-background"></select>
    </span>
    <span className="ql-formats">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-strike"></button>
        <button className="ql-script" value="sub"></button>
        <button className="ql-script" value="super"></button>
    </span>
    <span className="ql-formats">
        <input style={{width:'20px'}} type="text" placeholder="行" onChange={(v)=>{
          this.setState({tableRowNum:v.target.value});
        }}/> 
        x 
        <input style={{width:'20px'}} type="text" placeholder="列" onChange={(v)=>{
          this.setState({tableColumnNum:v.target.value});
        }}/>
        <button size="small" onClick={this.createTable.bind(this)}>
            T
        </button>
    </span>
    <span className="ql-formats">
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
    </span>
    <span className="ql-formats">
        <button className="ql-image"></button>
        <button className="ql-video"></button>
    </span>
    <span className="ql-formats">
        <button className="ql-indent" value="-1"></button>
        <button className="ql-indent" value="+1"></button>
        <button className="ql-direction" value="rtl"></button>
        <select className="ql-align">
            <option defaultValue></option>
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
        </select>
        <button className="ql-formula"></button>
        <button className="ql-clean"></button>
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