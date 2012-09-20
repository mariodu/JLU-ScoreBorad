var TEAMS = ["交通学院", "法学院", "军需科技学院", "环境与资源学院", "外国语学院", "白求恩医学院"];
var Template;

Count = {
  GetTemplate: function(key){
    var origin_template = $(key);
    origin_template.removeClass(key);
    origin_template.remove();
    Template = origin_template;
  },

  initBoard: function(){
    for(i = 1; i <= TEAMS.length; i++){
      if((i-1) % 3 == 0){
        $(".container-fluid").append('<div class = "row-fluid board"></div>');
      }
      template = Template.clone().attr('id', "record_" + i);
      template.find("h2").text(TEAMS[i - 1]);
      $(".row-fluid.board").last().append(template);
    }
  },

  initRecord: function(){
    for(i = 1; i <= TEAMS.length; i++){
      Count.store.get("team_" + i, function(ok, val) {
        if (ok)
          $("#record_" + i + " h3.mark").text("得分：" + val);
      });
    }
  },

  upRecord: function(){
    var mark, amount;
    $(".mark_bar a[id^=mark]").click(function(){
      mark = parseInt($(this).text());
      parent = $(this).parent().parent().attr("id");
      amount = parseInt($("#" + parent + " h3.mark").text().replace(/[^0-9]/ig, "")) + mark;
      $("#" + parent + " h3.mark").text("得分：" + amount);
      Count.SaveData();
    })
  },

  SaveData: function(){
    for(i = 1; i <= TEAMS.length; i++){
      val = parseInt($("#record_" + i + " h3.mark").text().replace(/[^0-9]/ig, ""));
      Count.store.set("team_" + i, val);
    }
  },

  Remove_All_Data: function(){
    for(i = 1; i <= TEAMS.length; i++){
      Count.store.set("team_" + i, 0);
    }
  }
};
Count.store = new Persist.Store('records', {
  swf_path: './persist.swf'
});
$(function(){
  Count.GetTemplate('.template');
  Count.initBoard();
  $("button#clearData").click(function(){
    Count.Remove_All_Data();
    location.reload();
  });
  Count.initRecord();
  Count.upRecord();
  $(".footer .container").hide();
  $(".footer").hover(function(){
    $(".footer .container").fadeIn('slow');
  }, function(){
    $(".footer .container").fadeOut('slow');
  }
  );
});