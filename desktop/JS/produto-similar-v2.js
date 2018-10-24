window.onload = function() {
    var url = "/api/catalog_system/pub/products/crossselling/similars/";
    $('.produto-cor').each(function(){
        $(this).addClass('loading');
    })
};

$('body').ajaxStop(function(){
    $(function() {
        $(".next-arrow").click(function() {
            var t = $(this).parent().parent().find(".produto-cor"),
                a = t.find(".quadrado").first(),
                i = t.find(".quadrado").last();
            a.insertAfter(i)
        }), $(".prev-arrow").click(function() {
            var t = $(this).parent().parent().find(".produto-cor"),
                a = t.find(".quadrado").first();
            t.find(".quadrado").last().insertBefore(a)
        });
        var t = function() {
            $(".produto-cor").each(function(t) {
                var a = $(this).attr("id_produto"),
                    i = "/api/catalog_system/pub/products/crossselling/similars/" + a,
                    r = 0;
                $.getJSON(i, function(t) {
                    var i = "teste";
                    $.each(t, function(t, e) {
                        var o = e.link;
                        $.each(e.items, function(t, e) {
                            var n = e.images[0].imageUrl,
                                d = "";
                            if (0 == r) {
                                var s = $("span[data-id=" + a + "]").parents().find(".productImage").find("a").attr("href"),
                                    c = $("span[data-id=" + a + "]").parents().find(".productImage").find("img").attr("src");
                                d = "<div class='quadrado teste' data-url='" + c + "' data-link='" + s + "' data-id='" + a + "'><img src='" + c + "' /></div>"
                            }
                            $('[id_produto="' + a + '"]').append(d + "<div class='quadrado " + i + "' data-url='" + n + "' data-link='" + o + "' data-id='" + a + "'><img src='" + n + "' /></div>"), r += 1, console.log("ID: ", a, " I: ", r)
                        })
                    })
                })
            }), $(document).ajaxComplete(function() {
                $(".productList .quadrado").each(function() {
                    var t = $(this).attr("class"),
                        a = t.split(/\//)[0],
                        i = t.split(/\//)[1];
                    $(this).removeClass(), $(this).addClass(a + " -" + i)
                })
            }), setTimeout(function() {
                var t, a = [];
                $(".produto-cor > div > img").filter(function() {
                    return t = $(this).attr("src"), $.inArray(t, a) < 0 ? (a.push(t), !1) : ($(this).parent().remove(), !0)
                }).remove()
            }, 1500)
        };
        t(), $(document).on("mouseenter", ".quadrado", function() {
            var t = $(this).data("id");
            console.log("id : ", t), $("span[data-id=" + t + "]").parent().find(".productImage").find("a").attr("href", $(this).data("link"));
            var a = $("<div style='background:rgba(255,255,255,0.6) center no-repeat;top:0;bottom:0;left:0;right:0;position:absolute;'></div>");
            $(this).closest("li").find(".productImage > a").css("position", "relative").append(a).find("img").attr("src", $(this).data("url")), $(this).hasClass("hovered") ? a.remove() : ($(this).closest("li").find(".productImage > a > img").load(function() {
                a.remove()
            }), $(".prateleira li").removeClass("hovered"), $(this).addClass("hovered"))
        }), $(".prateleira li.acessorios .produto-cor").each(function() {
            var t = $(this).find("div");
            $(t).length > 0 && $(this).parent().addClass("active")
        }), $(".next-arrow").click(function() {
            var t = $(this).parent().parent().find(".produto-cor"),
                a = t.find(".quadrado").first(),
                i = t.find(".quadrado").last();
            a.insertAfter(i)
        }), $(".prev-arrow").click(function() {
            var t = $(this).parent().parent().find(".produto-cor"),
                a = t.find(".quadrado").first();
            t.find(".quadrado").last().insertBefore(a)
        }), setTimeout(function() {
            $("li.helperComplement").remove()
        }, 3e3);
        setTimeout(function() {
            $(".produto-cor").each(function() {
                itens = $(this).children().length, itens <= 1 && $(this).parent().html("").attr("style", "height:0px")
            })
        }, 6e3), $(document).delegate(".pages", "click", function() {
            setTimeout(function() {
                console.log("Clicou"), t(), $("li.helperComplement").remove(), console.log("liRemoved")
            }, 3e3)
        })
    })
})