/**
 * @name: filmdetail.js
 * @author：Huilin Lai
 * @update：2019/05/15
 * @description：Show the corresponding movie details page
 */
$(function(){

    /** @function getUrlParam(name)
     * @description Get the needed value from URL.
     * @param{string}name - the needed attribute in the URL.
     * @return{string} - the parameter value passed by URL.
     */
    function  getUrlParam(name) {
        //Construct a regular expression object with target parameters
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        //Match target parameter
        var r = window.location.search.substr(1).match(reg);
        //Return parameter value
        if (r != null) return unescape(r[2]); return null;
    }

    var id = getUrlParam('filmsId');
    console.log('id:'+id);

    /** @description Load information for the movie detail.
     */
    $.getJSON('http://localhost:3001/123',function (data) {
        console.log(222);
        var article = document.getElementById("article");
        article.innerHTML = " ";
        var moviedetail = document.createElement("div");
        moviedetail.className = "work-feature-block row";
        $.each(data, function(i,info){
            if(id == info["_id"]){
                document.getElementById("movieGenre").innerHTML = info["genres"];
                var moiveposter = document.createElement("div");
                moiveposter.className = "columns medium-3";
                var img = document.createElement("img");
                img.className = "work-feature-block-image";
                img.src = info["poster"];
                moiveposter.appendChild(img);
                moviedetail.appendChild(moiveposter);
                var movieinfo = document.createElement("div");
                movieinfo.className = "columns medium-9";
                var h3 = document.createElement("h3");
                h3.className = "work-feature-block-header";
                h3.innerHTML = info["title"];
                movieinfo.appendChild(h3);
                var summary = document.createElement("p");
                summary.innerHTML = info["directors"][0]["name"]+"<br /><br />"+info["summary"];
                movieinfo.appendChild(summary);

                var actordiv = document.createElement("div");
                actordiv.className = "columns medium-5";
                var actor = document.createElement("h3");
                actor.innerHTML="Actors 演员表";
                var actortable = document.createElement("ul");
                for(var i = 0; i < info["casts"].length; i++){
                    var li = document.createElement("li");
                    li.innerHTML = info["casts"][i]["name"];
                    actortable.appendChild(li);
                }
                actordiv.appendChild(actor);
                actordiv.appendChild(actortable);
                movieinfo.appendChild(actordiv);


                var ratediv = document.createElement("div");
                ratediv.className = "columns medium-4";
                var rate = document.createElement("h3");
                rate.innerHTML = "Stars 星级";
                ratediv.appendChild(rate);
                // graphical visualization of rating
                for(var i = 0; i < 5; i++){
                    var numberstar = document.createElement("div");
                    numberstar.innerHTML = 5-i +"星" + " <small>"+info["rating"]["stars"][i]+"%" + "</small>";
                    var bardiv = document.createElement("div");
                    bardiv.id = "bar";
                    var prodiv = document.createElement("div");
                    prodiv.id = "progress";
                    prodiv.style.width = info["rating"]["stars"][i]+"%";
                    bardiv.appendChild(prodiv);
                    numberstar.appendChild(bardiv);
                    ratediv.appendChild(numberstar);
                    // var br = document.createElement("br");
                    // ratediv.appendChild(br);
                }

                movieinfo.appendChild(ratediv);
                moviedetail.appendChild(movieinfo);
            }
        });
        article.appendChild(moviedetail);

    });

    /** @description The star click event
     */
    $('[data-rating] .star').on('click', function() {
        var selectedCssClass = 'selected';
        var $this = $(this);
        $this.siblings('.' + selectedCssClass).removeClass(selectedCssClass);
        $this
            .addClass(selectedCssClass)
            .parent().addClass('is-voted');
    });

    /** @description The submit button of star click event
     */
    $("#starSubmit").on('click',function () {
        alert("Submit Succeed！");
    });
    /** @description The submit button of comments click event
     */
    $("#textSubmit").on('click',function () {
        alert("Submit Succeed！");
    });
});