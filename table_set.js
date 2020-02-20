var tname="";
var _id="";


$(function(){
table_init();

})


function btn_add(){
_id="";
$("#c1").val("");
$("#c2").val("");
$("#c3").val("lykj_table_data");
$("#modal_btn_add").modal({backdrop: 'static'});
}


function btn_update_add(id){
   table_return_id("lykj_table","","_id",id,function(data){
	   var redata=eval("("+data+")");
	   var c1=redata[0].名称;
	   $("#c1").val(c1);
	   var c2=redata[0].描述;
	   $("#c2").val(c2);
	   var c3=redata[0].表名;
	   $("#c3").val(c3);
	   var c4=redata[0].模板;
	   $("#c4").val(c4);
	   $('.selectpicker').selectpicker('refresh');
	   $('.selectpicker').selectpicker('render');
	   _id=redata[0]._id;
	   $("#modal_btn_add").modal({backdrop: 'static'});
	   
   });
}


var deleteid = "";
function btn_delete(id){
	deleteid = id;
	$("#modal_delete").modal({backdrop: 'static'});

}

function btn_delete_quren() {
	var json = "{'_id':'" + deleteid + "'}";
	table_delete_new("lykj_table", json, function(data) {
		$("#modal_delete").modal('hide');
		$("#table").bootstrapTable('refresh');
	});
}


function btn_submit(){
	var json="";
	var array=$("[data-type='form']");
	for(var i=0;i<array.length;i++){
		var fid=array[i].id;
		var key=$("[for='"+fid+"']").html(); //名称
		var type=$("#"+fid)[0].tagName.toLowerCase(); //类型
		var required=$("#id"+fid).attr("required");
		val=$("#"+fid).val();
		if(val==""){
		mui.toast(key+"不能为空！");	
		$("#"+fid).focus();
		return;
		}

		var val="";
		if(i==0){
			if(type=="text"||type=="textarea"){
			val=$("#"+fid).val();
	        json="'"+key+"':'"+val+"'";
			}else{
			val=$("#"+fid).val();
	        json="'"+key+"':'"+val+"'";	
			}
		}else{
		if(type=="text"||type=="textarea"){
			val=$("#"+fid).val();
	        json=json+",'"+key+"':'"+val+"'";
			}else{
			val=$("#"+fid).val();
	        json=json+",'"+key+"':'"+val+"'";
			}	
		}
	}
	
	var time=new Date().format("yyyy-MM-dd");
	//添加上必要参数
	json=json+",'userid':'"+userid+"'";
	json=json+",'name':'"+name+"'";
	json=json+",'compid':'"+compid+"'";
	json=json+",'deptid':'"+deptid+"'";
	json=json+",'创建人':'"+name+"'";
	json=json+",'创建时间':'"+time+"'";
	json=json+",'partentid':'0'";
	json="{"+json+"}";
	table_update_new("lykj_table","{'_id':'"+_id+"'}",json,function(data){
	$("#modal_btn_add").modal('hide');
	$('#table').bootstrapTable('refresh');
	});
}

function table_init() {
	//先销毁表格  
	$('#table').bootstrapTable('destroy');
	//初始化表格,动态从服务器加载数据  
	$("#table").bootstrapTable({
		method: "get", //使用get请求到服务器获取数据  
		url: surl+"userAction_table_search_new_table.action", //获取数据的Servlet地址  
		striped: true, //表格显示条纹  
		pagination: true, //启动分页  
		/* cardView:true, //用户移动设备 */
		pageSize: 10, //每页显示的记录数  
		currentPage: 1, //当前第几页  
		pageList: [5, 10, 15, 20, 25], //记录数可选列表  
		search: true, //是否启用查询
		searchOnEnterKey: true, //回车查询
		showColumns: true, //显示下拉框勾选要显示的列  
		showRefresh: true, //显示刷新按钮  
		sidePagination: "server", //表示服务端请求 ,   
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		//设置为limit可以获取limit, offset, search, sort, order  
		queryParamsType: "undefined",
		queryParams: function queryParams(params) { //设置查询参数  
			var str_search = "{'partentid':'0','userid':'"+userid+"'}";
			if(typeof(params.searchText) != "undefined") {
				str_search = "{$and:[{$or:[{'名称':{$regex:'" + params.searchText + "',$option:'i'}},{'描述':{$regex:'" + params.searchText + "',$option:'i'}},{'创建人':{$regex:'" + params.searchText + "',$option:'i'}},{'创建时间':{$regex:'" + params.searchText + "',$option:'i'}},{'表名':{$regex:'" + params.searchText + "',$option:'i'}}]},{'partentid':'0'},{'userid':'"+userid+"'}]}";
			}

			var param = {
				currentPage: params.pageNumber,
				pageSize: params.pageSize,
				table_name: "lykj_table",
				str_search: str_search,
				sort: "{'time':1}"
			};
			return param;
		},
		onLoadSuccess: function() { //加载成功时执行  
			console.log("加载成功");
		},
		onLoadError: function() { //加载失败时执行  
			console.log("加载数据失败", {
				time: 1500,
				icon: 2
			});
		},
		toolbar: '#toolbar', //工具按钮用哪个容器
		showExport: true, //是否显示导出按钮  
		exportDataType: "all", //basic', 'all', 'selected'.
		exportTypes: ['excel'], //导出文件类型  
		exportOptions: {
			fileName: '导出', //文件名称设置  
			worksheetName: 'sheet1', //表格工作区名称  
			tableName: '导出',
			ignoreColumn: [4], //忽略某一列的索引 
		},
		columns: [
		{ 
           title: '#',//标题  可不加
           align: 'center',
           formatter: function (value, row, index) {  
           return index+1;  
           }  
        },{
			field: '名称',
			title: '名称',
			align: 'center',
			sortable : true
		}, {
			field: '描述',
			title: '描述',
			align: 'center',
		},{
		   field: '模板',
		   title: '模板',
		   align: 'center',
	    },{
		   field: '表名',
		   title: '表名',
		   align: 'center',
	    },{
			title: '操作',
			field: '#',
			align: 'center',
			formatter: function(value, row, index) {
				var d = "<a href='javascript:;' class='btn btn-danger' onclick=btn_delete('" + row._id + "')>删除</a>"
				var e = "<a href='javascript:;' class='btn btn-default' onclick=btn_update_add('" + row._id + "')>修改</a>"
				var f = "<a href='javascript:;' class='btn btn-default' onclick=btn_attr('" + row._id + "','" + row.表名 + "')>字段管理</a>"
				var href = "<a href='javascript:;' class='btn btn-default' onclick=btn_href('" + row._id + "','" + row.表名 + "')>获取地址</a>"
				return d + e + f + href;
			}
		}]
	});
}

//属性管理
function btn_attr(id,tname){
	window.location.href="table_set_attr.jsp?id="+id+"&tname="+tname;
}

//查看
function btn_show(id,tname){
	window.location.href="table_show.jsp?id="+id+"&tname="+tname;
}

//获取权限地址
function btn_href(id,tname){
	$("#text_pro").val("views/admin/table_show.jsp?id="+id+"&tname="+tname);
	$("#modal_pro").modal('show');
}
