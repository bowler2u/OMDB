// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    
    $('#movieForm').on('submit', function(e){
        
        var searchmovie = $('#movieName').val();
        
        fetchmovies(searchmovie);
        //console.log(searchmovie);
        
        e.preventDefault();
    })
    var cards = "";
    function fetchmovies(searchmovie){
        //API CALL
        $.ajax({
            method: "GET",
            url: "http://www.omdbapi.com/?apikey=a22eb313&s=" + searchmovie
        }).done(function(data){
            console.log(data);
            var myData = data;
            
            for(var i=0; i<myData.Search.length; i++){
           cards +=` 
                <div class="list-block media-list" style="margin:0">
                  <ul>
                    <li>
                      <a href="movie.html" class="item-link item-content" onclick="clickedMovie('${myData.Search[i].imdbID}')">
                        <div class="item-media"><img src="${myData.Search[i].Poster}" width="100"></div>
                        <div class="item-inner">
                            <div class="item-title">${myData.Search[i].Title}</div>
                            <div class="item-after">${myData.Search[i].Year}</div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div> `}
            $('#c1').html(cards);
        });
    }
});

function clickedMovie(id){
    sessionStorage.setItem("MovieID", id);
}

var cardDetails = "";
myApp.onPageInit('movie', function () {

    var mID = sessionStorage.getItem("MovieID");
    
    function fetchmovie(mID){
        //API CALL
        $.ajax({
            method: "GET",
            url: "http://www.omdbapi.com/?apikey=a22eb313&i=" + mID
        }).done(function(data){
            var myData = data;
            console.log(myData);
            
            cardDetails = `<div class="card" style="width: 20rem;">
                      <img class="card-img-top" src="${myData.Poster}" style="width: 100%" alt="Card image cap">
                      <div class="card-body">
                        <h5 class="card-title">${"Title: " + myData.Title}</h5>
                        <p class="card-text">${"Year: " +myData.Year}</p>
                        <a href="${myData.Website}" class="btn btn-primary">Read More</a>
                      </div>
                    </div>`;
            $('#c2').html(cardDetails);
            
            }) 
        }
    fetchmovie(mID);
    })
    
    
