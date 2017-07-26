$(document).ready(function(){
    $(".result-wrapper").hide();
});

function wikiSearch(inputValue){
        $.ajax({
        url: "https://en.wikipedia.org/w/api.php?callback=?",
        data: {
            action: 'query',
            format: 'json',
            inprop: "url",
            formatversion: 2,
            generator: 'search',
            gsrsearch: inputValue,
            gsrwhat: "text",
            prop: 'extracts|info',
            exsentences: 3,
            exintro: "",
            explaintext: "",        
            exlimit: 20,
            gsrlimit: 5,
        },
        dataType: 'jsonp',
        error: function(err){
            console.log(JSON.stringify(err));
        },
        success: function(result){
            $(".search-wrap").removeClass("height-100");
            $(".result-wrapper").show();
            $(".results").empty();
            if(result.query == undefined){
                $(".results").append("<article><p>Nothing Found :(</p></article>");
            }
            else 
                {
                    result.query.pages.forEach(function(x){
                        $(".results").append("<article><a target=\"_blank\" href=\""+x.fullurl+"\"></a><h2>"+x.title+"</h2><p>"+x.extract+"</p></article>");
                    });
                }
        }
    });
}

$(".search-input").keyup(function(){
    if(!$(".search-input").val()){
        $(".search-wrap").addClass("height-100");
        $(".result-wrapper").hide();
    }
    else{
        wikiSearch($(".search-input").val());
    }
});

