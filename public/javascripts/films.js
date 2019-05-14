/**
 * @name: films.js
 * @author：Huilin Lai
 * @update：2019/05/15
 * @description：Control the list of movies in the page with the Interaction of users.
 */

var dataRows = []; /* all films' information */
var pageIndex = 0; /* total number of movie entries */
var pageNum = 20; /* the most items that can be displayed on one page */

/** @description Load the movie list entry for the page.
 * @param{number}p - the page number.
 */
function page(p) {
    pageIndex = Math.max(0,Math.min(p,Math.ceil(dataRows.length/pageNum)-1));
    //set the previous-page button
    document.getElementById("previous").href = "javascript:page(pageIndex - 1)";
    //set the next-page button
    document.getElementById("next").href = "javascript:page(pageIndex + 1)";
    $("#currPage").text(pageIndex+1);
    var jsontip = document.getElementById("jsonTip");
    jsontip.innerHTML = " ";
    //load information for each movie entry
    for (var i = pageIndex*pageNum; i < Math.min(pageIndex*pageNum+pageNum,dataRows.length); i++) {
        var v = dataRows[i];
        var part = document.createElement("div");
        part.className = "row";
        var poster = document.createElement("div");
        poster.className = "large-2 columns";
        var img = document.createElement("img");
        img.src = v["poster"];
        img.alt = "image for movie";
        poster.appendChild(img);
        part.appendChild(poster);
        var des = document.createElement("div");
        des.className = "large-9 columns";
        var title = document.createElement("h5");
        var moviedetail = document.createElement("a");
        moviedetail.href = "filmdetail.html?filmsId="+v["_id"];
        // moviedetail.target = "_blank";
        moviedetail.innerHTML = v["title"];
        title.appendChild(moviedetail);
        des.appendChild(title);
        var genres = document.createElement("p");
        genres.innerHTML = "<span><i class=\"fi-calendar\"> "+v["pubdate"]+" &nbsp;&nbsp;</i></span>\n" +
            "<span><i class=\"fi-torso\"> "+v["genres"]+" &nbsp;&nbsp;</i></span>\n" +
            "<span><i class=\"fi-comments\"> "+v["languages"]+"</i></span>";
        des.appendChild(genres);
        var rate = document.createElement("p");
        rate.innerHTML = "<span class=\"rate\"> "+v["rating"]["average"]+ "</span> （" + v["rating"]["rating_people"] + "人评价）";
        des.appendChild(rate);
        part.appendChild(des);
        jsontip.appendChild(part);
        var hr = document.createElement("hr");
        jsontip.appendChild(hr);
    }
}

/** @description Read the json file and extract the information。
 */
$(document).ready(function(){
    console.log(1111);

    $.getJSON('http://localhost:3001/123',function (data) {
        dataRows = data;
        $("#mlen").text(dataRows.length);
        var totalpage = Math.ceil(dataRows.length/20);
        $("#totalpage").text(totalpage);
        page(0);
    });
});

/** @description Read the json file and extract the information as the home page.
 */
function initialPage(){
    dataRows = [];
    $.getJSON('http://localhost:3001/123',function (data) {
        dataRows = data;
        $("#mlen").text(dataRows.length);
        var totalpage = Math.ceil(dataRows.length/20);
        $("#totalpage").text(totalpage);
        page(0);
    });


}

/** @description Implement a search for a user-entered movie name or genres.
 */
function search() {
    dataRows = [];
    var searchstr = document.getElementById("searchfilm").value;
    $.getJSON('http://localhost:3001/123',function (data) {
        $.each(data, function(i,info){
            if(info["title"].indexOf(searchstr) != -1 || info["genres"].indexOf(searchstr) != -1){
                dataRows.push(info);
            }
        });
        $("#mlen").text(dataRows.length);
        var totalpage = Math.ceil(dataRows.length/20);
        $("#totalpage").text(totalpage);
        page(0);
    });
}

/** @description Jump to the page number entered by the user.
 */
function reachPage(){
    var pagenumber = document.getElementById("pageNumber").value;
    page(pagenumber-1);
}

/** @description Show movie entries by genres.
 * @param{string}genres - the movie genres.
 */
function movieGenre(genres) {
    dataRows = [];
    $.getJSON('http://localhost:3001/123', function (data) {
        $.each(data, function (i, info) {
            if (info["genres"].indexOf(genres) != -1) {
                dataRows.push(info);
            }
        });
        $("#mlen").text(dataRows.length);
        var totalpage = Math.ceil(dataRows.length/20);
        $("#totalpage").text(totalpage);
        page(0);
    });
}
