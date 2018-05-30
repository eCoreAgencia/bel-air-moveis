$(function(){
  $(".pageNavMenuDepartamento li a:first-of-type").each(function(){
    var href = $(this).attr('href');
    $(this).attr('href', href + '?PS=20&O=OrderByTopSaleDESC')
  })
})
