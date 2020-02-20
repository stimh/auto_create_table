<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>表设计</title>
		<meta name="renderer" content="webkit">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<link rel="stylesheet" href="../../../css/layui.css" media="all">
		<link rel="stylesheet" href="../../../css/mui.css" media="all">
		<link rel="stylesheet" href="../../../css/bootstrap.css" media="all">
		<link rel="stylesheet" href="../../../css/bootstrap-table.css" media="all">
		<link rel="stylesheet" href="../../../css/bootstrap-select.css">

		<script src="../../../js/jquery.js"></script>
		<script src="../../../js/bootstrap.js"></script>
		<script src="../../../js/bootstrap-table.min.js"></script>
		<script src="../../../js/bootstrap-table-zh-CN.js"></script>
		<script src="../../../js/bootstrap-select.js"></script>
		<script src="../../../js/mui.js"></script>
		<script src="../../../js/h5_stimh.js?ver=1"></script>
		<script type="text/javascript" src="table_set.js"></script>
		<script type="text/javascript">
		var userid='<%=session.getAttribute("userid")%>';
		var name='<%=session.getAttribute("name")%>';
		var user='<%=session.getAttribute("user")%>';
		
		btn_check_login_url("../../login.html");
		user=eval("("+user+")");
		var deptid=user[0].deptid;
		var compid=user[0].compid;
		mui.init();
		</script>
	</head>

	<body>
		<div class="container">

		<div class="table-responsive">
				
				<div id="toolbar">
					<button style="margin: 5px;" type="button" onclick="btn_add()" class="layui-btn">新增</button>
				</div>
				<table id="table" class="table table-striped"></table>
			</div>
		</div>

		<div class="modal fade" tabindex="-1" role="dialog" id="modal_btn_add">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="modal-title"></h4>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label for="c1">名称</label>
							<input id="c1" required="required"  data-type="form" class="form-control" placeholder="必填" />
						</div>
						<div class="form-group">
							<label for="c2">描述</label>
							<textarea id="c2" required="required" data-type="form" class="form-control" placeholder="必填"></textarea>
						</div>
						<div class="form-group">
							<label for="c3">表名</label>
							<input id="c3" required="required"  data-type="form" value="lykj_table_data" class="form-control" placeholder="默认提交到lykj_table_data,提交到其他请修改" />
						</div>
						
						<div class="form-group">
							<label for="c4">模板</label><span>是否允许在逐级优选中调用</span>
							<select id="c4" class="selectpicker show-tick form-control" data-type="form">
							<option value="否" selected="selected">否</option>
							<option value="是">是</option>
							</select>
						</div>
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="layui-btn" onclick="btn_submit()">提交</button>
					</div>
				</div>
			</div>
		</div>
		
		<!--删除-->
			<div class="modal fade" id="modal_delete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="exampleModalLabel">删除确认</h4>
						</div>
						<div class="modal-body">
							是否确定删除
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
							<button type="button" class="mui-btn mui-btn-blue" onclick="btn_delete_quren()">确认</button>
						</div>
					</div>
				</div>
			</div>
			
			
			<div class="modal fade" id="modal_pro" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="exampleModalLabel">地址</h4>
						</div>
						<div class="modal-body">
							<input type="text" id="text_pro"/>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
						</div>
					</div>
				</div>
			</div>
	</body>
</html>
