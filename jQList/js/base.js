; (function () {
  'use strict'
  var $form_add_task = $('.add-task'),
    $task_delete_trigger,
    $task_detail_trigger,
    $update_form,
    $task_detail = $(".task-detail"),
    $task_detail_mask = $(".task-detail-mask"),
    task_list = [],
    current_index,
    $task_detail_content,
    $task_detail_content_input;
  init();
  // 添加提交
  $form_add_task.on("submit", on_add_task_form_submit);
  $task_detail_mask.on("click", hide_task_detail);
  function on_add_task_form_submit(e) {
    var new_task = {};
    // 禁用默认行为
    e.preventDefault();
    // 获取新Task值
    var $this = $(this);
    var $input = $this.find('input[name=content]');
    new_task.content = $input.val();
    // 如果新Task值为空，则直接返回，否则继续执行
    if (!new_task.content) return;
    // 存入新task
    if (addtask(new_task))
      render_task_list();
    $input.val(null);
  }
  function listen_task_detail() {
    $task_detail_trigger.on('click', function(){
      var $this = $(this);
      var $item = $this.parent().parent();
      var index = $item.data('index');
      show_task_detail(index);
    })
  }
  // 查看Task详情
  function show_task_detail(index) {
    render_task_detail(index);
    current_index = index;
    $task_detail.show(index);
    $task_detail_mask.show();
  }

  function update_task(index,data){
    console.log(data);
    if(!index || !task_list[index])
    return;

    task_list[index] =  data;
    refresh_task_list();
  }
  // 隐藏Task详情
  function hide_task_detail() {
    $task_detail.hide();
    $task_detail_mask.hide();
  }
  // 渲染详情页
  function render_task_detail(index) {
    if(index === undefined || !task_list[index] ){
      return;
    }
    var item = task_list[index];

    var tpl = ` 
    <form>
        <div class="content" > 
            ${item.content}
        </div>
        <div class="input-item"> 
           <input style="display:none;" type='text' name='content' value='${item.content}'>
        </div>
        <div>
            <div class="desc input-item">
                <textarea name="desc" >${item.desc || ''}</textarea>
            </div>
        </div>
        <div class="remind input-item">  
            <input type="date" name="remind_date" value="${item.remind_date}">
            <div>
            <button class='input-item' type="submit">更新</button>
            </div>
        </div>
    </form>`;
    $task_detail.html(null);
    $task_detail.html(tpl);
    $update_form = $task_detail.find('form');
    $task_detail_content = $update_form.find('.content');
    $task_detail_content_input = $update_form.find('[name=content]');
    $task_detail_content.on("dblclick",function (e) {
      $task_detail_content_input.show();
      $task_detail_content.hide();
      })

    // 更新
    $update_form.on("submit",function(e){
      e.preventDefault();
      var data = {};
      data.content = $(this).find('[name=content]').val();
      data.desc = $(this).find('[name=desc]').val();
      data.remind_date = $(this).find('[name=remind_date]').val();
      console.log('data',data);
      update_task(index,data);
      hide_task_detail();
    })
  }
  // 查找并监听所有删除按钮的点击事件
  function listen_task_delete() {
    $task_delete_trigger.on('click', on_listen_task_form_delete)
  }
  function on_listen_task_form_delete() {
    var $this = $(this);
    var $item = $this.parent().parent();
    var index = $item.data('index');
    var res = confirm("确认删除？");
    res ? task_delete(index) : null;
  }
  /**
  * 初始化列表
  */
  function init() {
    task_list = store.get('task_list') || [];
    if (task_list.length) {
      render_task_list();
      listen_task_detail();
    }
    $task_delete_trigger = $('.action.delete');
    $task_detail_trigger = $('.action.detail');
  }
  /**
  * 添加任务
  */
  function addtask(new_task) {
    
    task_list.push(new_task);
    // 更新localStorage
    refresh_task_list();
    return true;
  }
  /**
  * 渲染单条任务
  */
  function render_task_item(data, index) {
    if (!data || !index) {
      return;
    }
    var list_item_tpl = `  
        <div class="task-item" data-index=${index}> 
            <span> <input type="checkbox"></span>
            <span class="task-content">${data.content}</span>
            <span class="fr">
              <span class="action detail">详情</span>
              <span class="action delete">删除</span>
            </span>
      </div>`;
    return list_item_tpl;
  }
  /**
   * 渲染任务列表
   */
  function render_task_list() {
    var $task_list = $('.task-list')
    $task_list.html('');
    for (let i = 0; i < task_list.length; i++) {
      var $task = render_task_item(task_list[i], i);
      $task_list.prepend($task);
    }
    $task_delete_trigger = $('.action.delete');
    $task_detail_trigger = $('.action.detail');
    listen_task_delete();
    listen_task_detail();
  }
  /**
   * 刷新 localStorage数据并更新view
   */
  function refresh_task_list() {
    store.set('task_list', task_list);
    render_task_list();
  }
  /**
  * 删除任务
  */
  function task_delete(index) {
    if (index === undefined || !task_list[index]) {
      return;
    }
    delete task_list[index];
    refresh_task_list();
  }
})(); // 使用闭包，防止全局变量的污染
// 开头加分号，避免压缩时混淆

