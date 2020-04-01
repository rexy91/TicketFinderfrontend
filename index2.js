// Fetch Urls
const review_url = "https://ticketfinderbackend.herokuapp.com/reviews"
const stars = document.querySelectorAll('.fa')
const welcome_btn = document.querySelector('#welcome-button')
const update_btn = document.querySelector('#update-button')
const personal_planner_btn = document.querySelector('#personal-planner')
const show_page_div = document.querySelector('#show-page-div')
const planner_header = document.querySelector('#planner-header')
const planner_page_div = document.querySelector('#planner-page-div')
const home_page_sign_in_btn = document.querySelector('#signin-button')
const signout_btn = document.querySelector('#signout-button')
const login_form = document.querySelector('#login-form')
const update_form = document.querySelector('#update-form')
const forgot_password = document.querySelector('#forgot-password')
const login_signup_form_submit = document.querySelector('#signin-signup-submit')
const search_bar_col = document.querySelector('.search-bar-col')
const nav_bar = document.querySelector('#nav-bar')
const form_title = document.querySelector('#form-title')
const main_div = document.querySelector('.main-div')
const instruction = document.querySelector('#instructions-div')

const sport_btn = document.querySelector('#sport-btn')
const music_btn = document.querySelector('#music-btn')
const art_btn = document.querySelector('#art-btn')

const loggedIn_sport_btn = document.querySelector('#loggedIn-sport-btn')
const loggedIn_music_btn = document.querySelector('#loggedIn-music-btn')
const loggedIn_art_btn = document.querySelector('#loggedIn-art-btn')

// main page event div 
const main_page_first_event = document.querySelector('.event-photo-col')

// Review Append div
let reviews_append_div = document.querySelector('.reviews_append_div')

// Buy ticket button

let buy_button = document.querySelector('#buy-button')

// Opening and closing form 
let review_form = document.querySelector('#review-form')
const review_button = document.querySelector('#review-button')
let close_review_form_btn = document.querySelector('#close_form_btn')

//Bring up the form
review_button.addEventListener('click', e=>{
    console.log(review_form)
    review_form.style = 'display:block;'
    console.log(review_form)
    window.scroll(top);
})

// Closing the review form 
close_review_form_btn.addEventListener('click', e=> {
    review_form.style ='display:none;'
})

// When user is not logged in , dont allow writing review.
// review_form.addEventListener('submit', e => {
//         e.preventDefault()
//         alert('Please sign in to leave a review.')
// })

// Sign in form
// Post fetch to users
login_signup_form_submit.addEventListener('submit', (e) => {
    e.preventDefault()
    let username = e.target.username_value.value
    let password = e.target.password_value.value
if(username.length === 0){
alert('Username can not be blank.')
}
else if (password.length === 0){
alert('Password can not be blank.')
}
else{
    fetch("https://ticketfinderbackend.herokuapp.com/users", {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
             Accept: 'application/json'
        },
        body:JSON.stringify({
            username,
            password
        })
    })// end of fetch 
    .then(res=>res.json())
    .then(new_user => {
        // Will only work if new login 
        // SHow/hide after login 

        // Hide before-loggedIn buttons
        sport_btn.style.display='none'
        music_btn.style.display='none'
        art_btn.style.display='none'

        //Show show page buttons after logged in.
        loggedIn_sport_btn.style.display ='inline-block'
        loggedIn_music_btn.style.display ='inline-block'
        loggedIn_art_btn.style.display ='inline-block'

        personal_planner_btn.style.display ='block'
        signout_btn.style.display='block'
        review_button.style.display='block'
        instruction.style.display ='none'
        update_btn.style.display ='block'
        login_form.style.display ='none'
        main_div.style.display = 'block'
        home_page_sign_in_btn.style.display ='none'
        let current_user_tag = document.createElement('h5')
        current_user_tag.id = 'current_user'
        current_user_tag.innerHTML = `Current User: ${new_user.username}`
        nav_bar.append(current_user_tag)
        signOutFunction(new_user, current_user_tag)
        new_comment(new_user)
        updateUserName(new_user, current_user_tag)
        showPersonalPlanner(personal_planner_btn,new_user)
        
        // Call fetch functions inside login block, so can pass in user.
        // Refactor later 
            
            sportsFetch(new_user)
            artsFetch(new_user)
            musicFetch(new_user)
            
    // Welcome button to go back to home page
        welcome_btn.addEventListener('click', e=>{
            planner_header.style.display ='none'
            planner_page_div.innerHTML =''
            planner_page_div.style.display ='none'

}) 
    })// End of fetch .then 
}
    // Personal Planner eventListener after login 
    function showPersonalPlanner(personal_planner_btn,new_user){
            personal_planner_btn.addEventListener('click', e=> {
                planner_header.innerHTML = `<h2 id='planner_h2'>Your Upcoming Events</h2>`
                planner_header.style.display ='block'
                // planner_page_div.innerHTML=''
                fetch(`https://ticketfinderbackend.herokuapp.com/users/${new_user.id}`,{
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                })//end of ticket GET fetch 
                .then(res => res.json())
                .then(userObj => {
                    userObj.tickets.forEach(ticket => {
                    let single_event_div = document.createElement('div')
                    single_event_div.classList.add('show-page-col')
                    single_event_div.classList.add('col-lg-6')
                    single_event_div.style = 'border:solid 1px;'
                    // Inner html shouldn't have another div 
                    single_event_div.innerHTML = `
                    <img id = 'show_event_img' src = ${ticket.image}> 
                    <h4 id ='show_event_name'> ${ticket.name} </h4>
                    <h5 id ='show_event_time'>${ticket.time}</h5>
                    `
                planner_page_div.append(single_event_div)
                    })
                })

                main_div.style.display = 'none'
                // Fetch user's ticket page, localhost//users, since it also renders user's tickets.
                new_user.tickets.forEach(ticket => { 
      
                //     let single_event_div = document.createElement('div')
                //     single_event_div.classList.add('show-page-col')
                //     single_event_div.classList.add('col-4')
                //     single_event_div.style = 'border:solid 1px;'
                //     // Inner html shouldn't have another div 
                //     single_event_div.innerHTML = `
                //     <img id = 'show_event_img' src = ${ticket.image}> 
                //     <h4 id ='show_event_name'> ${ticket.name} </h4>
                //     <h5 id ='show_event_time'>${ticket.time}</h5>
                //     `
                // planner_page_div.append(single_event_div)
            })
        })//end of forEach
    }

// Sign Out button
// Fake sign out because in mod 3 sessions can't be persisted in front end.
function signOutFunction(new_user, current_user_tag){
signout_btn.addEventListener('click', (e) => {
        current_user_tag.style.display ='none'
        signout_btn.style.display='none'
        home_page_sign_in_btn.style.display ='block'
        personal_planner_btn.style.display = 'none'
        update_btn.style.display = 'none'

})
}
}) // End of Login function 


// New comment
function new_comment(new_user){
    review_form.addEventListener('submit', e => {
        e.preventDefault()
        let new_comment = e.target.user_review.value
        let new_rating = e.target.rating_dropdown.value
        let user_name = new_user.username
        // POST fetch for new comment 

        fetch(review_url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                rating: new_rating,
                content: new_comment,
                user_name,
                // Pass extra info through fetch into params:
                userId: new_user.id
            })
            })
        .then(res => res.json())
        .then(obj => {
            console.log(obj)
            let review_div = document.createElement('div')
                 review_div.innerHTML = `<div>
                 <h5><strong class="text-success" id ='user_name_in_review'>@${obj.user.username}</strong></h5>
                 <p> ${obj.content}</p>
                 <div class = 'review_star'>
                 <span class="fa fa-star"></span>
                 <span class="fa fa-star"></span>
                 <span class="fa fa-star"></span>
                 <span class="fa fa-star"></span>
                 <span class="fa fa-star"></span>
                </div>`
                review_div.id = 'review-div'

    // Check the stars base on the rating , when i < rating , check it.
    reviews_append_div.append(review_div)
    let spans = review_div.querySelectorAll('span')

function checkStars(index){
    spans.forEach((span,i) => {
        span.classList.toggle('checked', i < index )

    })} 
checkStars(obj.rating)
            })
}) } // End of new comment 

// Fetch reviews to the DOM
fetch(review_url)
.then(res => res.json())
.then(reviews => {
        reviews.forEach(review => {
            addReviewToDOM(review)
        })
})

function addReviewToDOM(review){

    let review_div = document.createElement('div')
    review_div.innerHTML = `<div>
    <h5><strong class="text-success" id='review_sec_username'>@${review.user.username}</strong></h5>
    <p> ${review.content}</p>
    <div class = 'review_star'>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
</div>`
    review_div.id = 'review_section'
    // Check the stars base on the rating , when i < rating , check it.
    reviews_append_div.append(review_div)
    let spans = review_div.querySelectorAll('span')
function checkStars(index){
    spans.forEach((span,i) => {
        span.classList.toggle('checked', i < index )

    })} 

checkStars(review.rating)

}



// Sports page when not logged in:
sport_btn.addEventListener('click', e => {
    console.log('here')
    planner_page_div.innerHTML =''
    main_div.style.display = 'none'
    // let show_page_div = document.querySelector('#show-page-div')
        show_page_div.innerHTML =''
        //    Brooklyn Sports fetch
        fetch("https://app.ticketmaster.com/discovery/v2/events.json?keyword=sports&city=brooklyn&apikey=GakWWYs0kV9kTWdT89oUptSkOAUQwMz5")
        .then(r => r.json()).then(object => {
            let row_div= document.createElement('div')
            object._embedded.events.forEach((event,index) => {
                let single_event_div = document.createElement('div')
                single_event_div.classList.add('show-page-col')
                single_event_div.classList.add('col-lg-4')
                single_event_div.style = 'border:solid 1px;'
                // Inner heml shouldn't have another div 
                single_event_div.innerHTML = `
                <p class = 'right'> Have Fun!!!! </p>
                <img id = 'show_event_img' src = ${event.images[0].url}> 
                <h4 id ='show_event_name'> ${event.name} </h4>
                <h5 id ='show_event_time'>${event.dates.start.localDate}, at ${event.dates.start.localTime}</h5>
                <button id = 'event_buy_ticket'> Buy Ticket </button>
                `
                // buy ticket
                let buy_ticket = single_event_div.querySelector('#event_buy_ticket')
                buy_ticket.addEventListener('click', e => {
                    alert('Please sign in to buy a ticket!!')
                })
                // row_div.append(single_event_div)
                row_div.classList.add('row')
                show_page_div.append(single_event_div)
            }) // end of foreach   

    })// end of sport fetch 

    // Welcome button to go back to home page

            welcome_btn.addEventListener('click', e=>{
                      planner_page_div.innerHTML =''
                    planner_page_div.style.display ='none'
                    show_page_div.innerHTML =''
                    main_div.style.display = 'block'
            })
}) // end of sport_btn 


// Art page

art_btn.addEventListener('click', e=> {
        planner_page_div.innerHTML =''
    main_div.style.display = 'none'
    // let show_page_div = document.querySelector('#show-page-div')
         show_page_div.innerHTML =''
        //    Brooklyn Sports fetch
        fetch("https://app.ticketmaster.com/discovery/v2/events.json?keyword=ny&dmaId=345&apikey=GakWWYs0kV9kTWdT89oUptSkOAUQwMz5")
        .then(r => r.json()).then(object => {
            let row_div= document.createElement('div')

            object._embedded.events.forEach((event,index) => {
      
                let single_event_div = document.createElement('div')
                single_event_div.classList.add('show-page-col')
                single_event_div.classList.add('col-lg-4')
                single_event_div.style = 'border:solid 1px;'
                // Inner heml shouldn't have another div 
                single_event_div.innerHTML = `
                <p class = 'right'> Have Fun!!!! </p>
                <img id = 'show_event_img' src = ${event.images[0].url}> 
                <h4 id ='show_event_name'> ${event.name} </h4>
                <h5 id ='show_event_time'>${event.dates.start.localDate}, at ${event.dates.start.localTime}</h5>
                <button id = 'event_buy_ticket'> Buy Ticket </button>
                `

                let buy_ticket = single_event_div.querySelector('#event_buy_ticket')
                buy_ticket.addEventListener('click', e => {
                    alert('Please signin to buy a ticket!')
                })

                // row_div.append(single_event_div)
                row_div.classList.add('row')
                show_page_div.append(single_event_div)

            }) // end of foreach   
    })// end of arts fetch 

          // Welcome button to go back to home page

          welcome_btn.addEventListener('click', e=>{
            
            show_page_div.innerHTML =''
            main_div.style.display = 'block'

    })
}) // end of arts_btn 

// Muisc page when not logged in:

music_btn.addEventListener('click', e=> {
    planner_page_div.innerHTML =''
    main_div.style.display = 'none'
    // let show_page_div = document.querySelector('#show-page-div')
        show_page_div.innerHTML =''
        fetch("https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=345&apikey=GakWWYs0kV9kTWdT89oUptSkOAUQwMz5")
        .then(r => r.json()).then(object => {
            let row_div= document.createElement('div')

            object._embedded.events.forEach((event,index) => {
      
                let single_event_div = document.createElement('div')
                single_event_div.classList.add('show-page-col')
                single_event_div.classList.add('col-lg-4')
                single_event_div.style = 'border:solid 1px; margin-bottom: 7px;'
                // Inner heml shouldn't have another div 
                single_event_div.innerHTML = `
                <p class = 'right'> Have Fun!!!! </p>
                <img id = 'show_event_img' src = ${event.images[0].url}> 
                <h4 id ='show_event_name'> ${event.name} </h4>
                <h5 id ='show_event_time'>${event.dates.start.localDate}, at ${event.dates.start.localTime}</h5>
                <button id = 'event_buy_ticket'> Buy Ticket </button>
                `
                let buy_ticket = single_event_div.querySelector('#event_buy_ticket')
                buy_ticket.addEventListener('click', e => {
                    alert('Please sign in to buy a ticket!!')
                })

                // row_div.append(single_event_div)
                row_div.classList.add('row')
                show_page_div.append(single_event_div)

            }) // end of foreach   
    
    })// end of arts fetch 

          // Welcome button to go back to home page

          welcome_btn.addEventListener('click', e=>{
            planner_page_div.innerHTML =''
            planner_page_div.style.display ='none'
            show_page_div.innerHTML =''
            main_div.style.display = 'block'
         })

}) // end of music btn  

// Sign in button on homepage , brings up the form 

    home_page_sign_in_btn.addEventListener('click', (e) => {
            show_page_div.style.display ='none'
            main_div.style.display = 'none'
            login_form.style.display ='block'


       // Welcome button to go back to home page
       welcome_btn.addEventListener('click', e=>{
        planner_page_div.innerHTML =''
        planner_header.style.display ='none'
        planner_page_div.style.display ='none'
        main_div.style.display = 'block'
        login_form.style.display = 'none'

     }) 
    })

// FOrgot password

    forgot_password.addEventListener('click', (e) => {
            alert("Try harder!")
    })


    // Update form pop up
    
    update_btn.addEventListener('click', e => {

            main_div.style.display ='none'
            login_form.style.display='block'
            login_signup_form_submit.style.display ='none'
            update_form.style='block'
            form_title.innerText = 'Update Username'  
            // Update function 

    })
    // Update username function: 
    // Need ID 
    function updateUserName(new_user,current_user_tag){

        update_form.addEventListener('submit', e=> {
            e.preventDefault()
            
            let new_user_name = e.target.new_user_name.value
            fetch(`https://ticketfinderbackend.herokuapp.com/users/${new_user.id}`, {
                method: "PATCH",
                headers:{
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body:JSON.stringify({

                    username: new_user_name,
                    user_id: new_user.id 
                })
            }) // End of fetch 
            .then(res => res.json())
            .then(updated_user => {
                console.log('updated')
                // This will only be obtained if a user did leave a comment, then can find from document.
                let user_name_in_review = document.querySelector('#user_name_in_review')
                
                // Update username on DOM 
                // let review_sec_username = review_div.querySelector('#review_sec_username')
                //     review_sec_username.innerText = updated_user.username
                    update_form.style.display ='none'
                    main_div.style.display ='block'
                let form_title = document.querySelector('#form-title')
                    form_title.style.display ='none'
                    current_user_tag.innerText = `Current User: ${updated_user.username} `
                    user_name_in_review.innerText = `@${updated_user.username}`
            })
        })
    }


// Show pages after user logged in 


// Sport page when logged in 

// function sportsFetch(new_user){
// console.log('jajaj')
//     // Sports page:
// sport_btn.addEventListener('click', e=> {

// console.log('sport button after logged')
// planner_header.style.display ='none'
// show_page_div.style.display ='block'
// planner_page_div.innerHTML =''
// main_div.style.display = 'none'
// // let show_page_div = document.querySelector('#show-page-div')
// show_page_div.innerHTML =''
//    Brooklyn Sports fetch
// fetch("https://app.ticketmaster.com/discovery/v2/events.json?keyword=sports&city=brooklyn&apikey=GakWWYs0kV9kTWdT89oUptSkOAUQwMz5")
// .then(r => r.json()).then(object => {
// let row_div= document.createElement('div')

// object.events.forEach((event,index) => {
//     console.log('here')
//     let single_event_div = document.createElement('div')
//     single_event_div.classList.add('show-page-col')
//     single_event_div.classList.add('col-lg-12 col-12')
//     single_event_div.style = 'border:solid 1px;'
//     // Inner heml shouldn't have another div 
//     single_event_div.innerHTML = `
//     <p class = 'right'> Have Fun!!!! </p>
//     <img id = 'show_event_img' src = ${event.images[0].url}> 
//     <h4 id ='show_event_name'> ${event.name} </h4>
//     <h5 id ='show_event_time'>${event.dates.start.localDate}, at ${event.dates.start.localTime}</h5>
//     <button id = 'loggedIn_sports_buy_ticket'> Buy Ticket </button>
//     `
//     // buy ticket
//     let buy_ticket = single_event_div.querySelector('#loggedIn_sports_buy_ticket')
//     console.log(buy_ticket)
//     buy_ticket.addEventListener('click', e => {
//         console.log('buy button after logged in')
//         alert('Congratsss, you have bought a ticket for this event!! Check your planner. Click "Welcome" to go back to home page')
//         //fetch
//         fetch("https://ticketfinderbackend.herokuapp.com/tickets", {
//             method: 'POST',
//             headers:{
//                 'Content-Type': 'application/json',
//                 Accept: 'application/json'
//             },
//             body:JSON.stringify({
//                 name: event.name,
//                 time: `${event.dates.start.localDate}, at ${event.dates.start.localTime}`,
//                 image: event.images[0].url,
//                 user_id: new_user.id
//             })
//         })// End of fetch 
//         .then(res => res.json())
//         .then(console.log)
//     })

//     // row_div.append(single_event_div)
//     row_div.classList.add('row')
//     show_page_div.append(single_event_div)

// }) // end of foreach   

// })// end of sport fetch 

// Welcome button to go back to home page

// welcome_btn.addEventListener('click', e=>{
//         planner_header.style.display ='none'
//         planner_page_div.style.display ='none'  
//         planner_page_div.innerHTML =''
//         show_page_div.innerHTML =''
//         main_div.style.display = 'block'
        
// })
// }) 
// } // End of sportFetch()


// Music Page when logged in 
function musicFetch(new_user){
// Muisc page

music_btn.addEventListener('click', e=> {
    planner_header.style.display ='none'
    show_page_div.style.display ='block'
    planner_page_div.innerHTML =''
main_div.style.display = 'none'
// let show_page_div = document.querySelector('#show-page-div')
show_page_div.innerHTML =''

fetch("https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=345&apikey=GakWWYs0kV9kTWdT89oUptSkOAUQwMz5")
.then(r => r.json()).then(object => {
let row_div= document.createElement('div')

object._embedded.events.forEach((event,index) => {
    let single_event_div = document.createElement('div')
    single_event_div.classList.add('show-page-col')
    single_event_div.classList.add('col-4')
    single_event_div.style = 'border:solid 1px;'
    // Inner heml shouldn't have another div 
    single_event_div.innerHTML = `
    <p class = 'right'> Have Fun!!!! </p>
    <img id = 'show_event_img' src = ${event.images[0].url}> 
    <h4 id ='show_event_name'> ${event.name} </h4>
    <h5 id ='show_event_time'>${event.dates.start.localDate}, at ${event.dates.start.localTime}</h5>
    <button id = 'event_buy_ticket'> Buy Ticket </button>

    `
    let buy_ticket = single_event_div.querySelector('#event_buy_ticket')
    buy_ticket.addEventListener('click', e => {
        console.log('inside current user fetch art buy button')
        alert('Congratsss, you have bought a ticket for this event!! Check your planner. Click "Welcome" to go back to home page')
        //fetch
        fetch("https://ticketfinderbackend.herokuapp.com/tickets", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body:JSON.stringify({
                name: event.name,
                time: `${event.dates.start.localDate}, at ${event.dates.start.localTime}`,
                image: event.images[0].url,
                user_id: new_user.id
            })
        })// End of fetch 
        .then(res => res.json())
        .then(console.log)
        
        
    })

    // row_div.append(single_event_div)
    row_div.classList.add('row')
    show_page_div.append(single_event_div)

}) // end of foreach   

})// end of arts fetch 

// Welcome button to go back to home page

welcome_btn.addEventListener('click', e=>{

planner_page_div.innerHTML =''
planner_page_div.style.display ='none'
show_page_div.innerHTML =''
main_div.style.display = 'block'
})

}) // end of music btn  
} // End of musicFetch() function

// Artpage when logged in

function artsFetch(new_user){
// Art page
art_btn.addEventListener('click', e=> {
    console.log('here')
    planner_header.style.display ='none'
    show_page_div.style.display ='block'
    planner_page_div.innerHTML =''
    main_div.style.display = 'none'
    // let show_page_div = document.querySelector('#show-page-div')
         show_page_div.innerHTML =''
        //    Brooklyn Sports fetch
        fetch("https://app.ticketmaster.com/discovery/v2/events.json?keyword=ny&dmaId=345&apikey=GakWWYs0kV9kTWdT89oUptSkOAUQwMz5")
        .then(r => r.json()).then(object => {
            let row_div= document.createElement('div')
            object._embedded.events.forEach((event,index) => {
                let single_event_div = document.createElement('div')
                single_event_div.classList.add('show-page-col')
                single_event_div.classList.add('col-4')
                single_event_div.style = 'border:solid 1px;'
                // Inner heml shouldn't have another div
                single_event_div.innerHTML = `
                <p class = 'right'> Have Fun!!!! </p>
                <img id = 'show_event_img' src = ${event.images[0].url}> 
                <h4 id ='show_event_name'> ${event.name} </h4>
                <h5 id ='show_event_time'>${event.dates.start.localDate}, at ${event.dates.start.localTime}</h5>
                <button id = 'logged_in_event_buy_ticket'> Buy Ticket </button>
                `
                let buy_ticket = single_event_div.querySelector('#logged_in_event_buy_ticket')
                buy_ticket.addEventListener('click', e => {
                    console.log('here')
                    alert('Congratsss, you have bought a ticket for this event!! Check your planner. Click "Welcome" to go back to home page')

                        //fetch
                        fetch("https://ticketfinderbackend.herokuapp.com/tickets", {
                            method: 'POST',
                            headers:{
                                'Content-Type': 'application/json',
                                Accept: 'application/json'
                            },
                            body:JSON.stringify({
                                name: event.name,
                                time: `${event.dates.start.localDate}, at ${event.dates.start.localTime}`,
                                image: event.images[0].url,
                                user_id: new_user.id
                            })
                        })// End of fetch 
                        .then(res => res.json())
                        .then(newTicket => {

                        })

                }) // end of buy ticket button 


                // row_div.append(single_event_div)
                row_div.classList.add('row')
                show_page_div.append(single_event_div)

            }) // end of foreach   
    
    })// end of arts fetch 

          // Welcome button to go back to home page

          welcome_btn.addEventListener('click', e=>{
            planner_header.style.display ='none'
            planner_page_div.innerHTML =''
            planner_page_div.style.display ='none'
            show_page_div.innerHTML =''
            main_div.style.display = 'block'
    })

}) // end of arts_btn 

} // End of artsfetch() function 




// Show pages after 'fake' logged in, user isnt being persisted , no user Auth for this project.

function sportsFetch(new_user){
loggedIn_sport_btn.addEventListener('click', e => {
    main_div.style.display = 'none'
    planner_header.style.display ='none'
    planner_page_div.innerHTML =''
    planner_page_div.style.display ='none'
    show_page_div.innerHTML ='' // Clear the previous show page 
    let loggedIn_sport_showpage = document.createElement('div')
        loggedIn_sport_showpage.classList.add('row')
    fetch("https://app.ticketmaster.com/discovery/v2/events.json?keyword=sports&city=brooklyn&apikey=GakWWYs0kV9kTWdT89oUptSkOAUQwMz5")
    .then(res => res.json())
    .then(objects => {

        objects._embedded.events.forEach(event =>{
            // show_page_div.append('jdfjsdajfsdf')
            // console.log(show_page_div)
            let loggedIn_sport_showcard = document.createElement('div')
                loggedIn_sport_showcard.classList.add('col-lg-4')
                loggedIn_sport_showcard.classList.add('show-page-col')
                loggedIn_sport_showcard.innerHTML= `
                <p class = 'right'> Have Fun!!!! </p>
                <img id = 'show_event_img' src = ${event.images[0].url}> 
                <h4 id ='show_event_name'> ${event.name} </h4>
                <h5 id ='show_event_time'>${event.dates.start.localDate}, at ${event.dates.start.localTime}</h5>
                <button id = 'event_buy_ticket'> Buy Ticket </button>
                `

            // buyTicketFunction(button,eventInfo)
            // append to index.html
            // console.log(loggedIn_sport_showpage)
            // show_page_div.append(loggedIn_sport_showpage)
            loggedIn_sport_showpage.append(loggedIn_sport_showcard)
            show_page_div.append(loggedIn_sport_showpage)
            show_page_div.style.display='block'
            // Not document.select, this will select from the html. 
            let buy_button = loggedIn_sport_showcard.querySelector("#event_buy_ticket")
                buy_button.addEventListener("click", e=>{
                    console.log('here')
                    alert("Congrats, event has been added to your personal planner. Click Welcome to go back to the home page.")
                    fetch("https://ticketfinderbackend.herokuapp.com/tickets", {
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                        },
                        body:JSON.stringify({
                            name: event.name,
                            time: `${event.dates.start.localDate}, at ${event.dates.start.localTime}`,
                            image: event.images[0].url,
                            user_id: new_user.id
                        })
                    })// End of fetch 
                    .then(res => res.json())
                    .then(console.log)
                })
        })
            // Still inside this function scope, so even button with the same id, only the button inside this function scope will get triggered.
    })
        // This is still inside the loggedIn-sport-button event.
            welcome_btn.addEventListener('click', e=>{
                planner_header.style.display ='none'
                planner_page_div.style.display ='none'  
                planner_page_div.innerHTML =''
                show_page_div.innerHTML =''
                main_div.style.display = 'block'})

})} // End of sportsFetch(Logged In)

function musicFetch(new_user){
    console.log('here')
    loggedIn_music_btn.addEventListener('click', e => {
        main_div.style.display = 'none'
        planner_header.style.display ='none'
        planner_page_div.innerHTML =''
        planner_page_div.style.display ='none'
        show_page_div.innerHTML ='' // Clear the previous show page 
        let loggedIn_sport_showpage = document.createElement('div')
            loggedIn_sport_showpage.classList.add('row')
            fetch("https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=345&apikey=GakWWYs0kV9kTWdT89oUptSkOAUQwMz5")
        .then(res => res.json())
        .then(objects => {
            
            objects._embedded.events.forEach(event =>{
                // show_page_div.append('jdfjsdajfsdf')
                // console.log(show_page_div)
                let loggedIn_sport_showcard = document.createElement('div')
                    loggedIn_sport_showcard.classList.add('col-lg-4')
                    loggedIn_sport_showcard.classList.add('show-page-col')
                    loggedIn_sport_showcard.innerHTML= `
                    <p class = 'right'> Have Fun!!!! </p>
                    <img id = 'show_event_img' src = ${event.images[0].url}> 
                    <h4 id ='show_event_name'> ${event.name} </h4>
                    <h5 id ='show_event_time'>${event.dates.start.localDate}, at ${event.dates.start.localTime}</h5>
                    <button id = 'event_buy_ticket'> Buy Ticket </button>
                    `
    
                // buyTicketFunction(button,eventInfo)
                // append to index.html
                // console.log(loggedIn_sport_showpage)
                // show_page_div.append(loggedIn_sport_showpage)
                loggedIn_sport_showpage.append(loggedIn_sport_showcard)
                show_page_div.append(loggedIn_sport_showpage)
                show_page_div.style.display='block'
                // Not document.select, this will select from the html. 
                let buy_button = loggedIn_sport_showcard.querySelector("#event_buy_ticket")
                    buy_button.addEventListener("click", e=>{
                        console.log('here')
                        alert("Congrats, event has been added to your personal planner. Click Welcome to go back to the home page.")
                        fetch("https://ticketfinderbackend.herokuapp.com/tickets", {
                            method: 'POST',
                            headers:{
                                'Content-Type': 'application/json',
                                Accept: 'application/json'
                            },
                            body:JSON.stringify({
                                name: event.name,
                                time: `${event.dates.start.localDate}, at ${event.dates.start.localTime}`,
                                image: event.images[0].url,
                                user_id: new_user.id
                            })
                        })// End of fetch 
                        .then(res => res.json())
                        .then(console.log)
                    })
            })
                // Still inside this function scope, so even button with the same id, only the button inside this function scope will get triggered.
        })
            // This is still inside the loggedIn-sport-button event.
                welcome_btn.addEventListener('click', e=>{
                    planner_header.style.display ='none'
                    planner_page_div.style.display ='none'  
                    planner_page_div.innerHTML =''
                    show_page_div.innerHTML =''
                    main_div.style.display = 'block'})
    
    })} // End of musicFetch(Logged In)
