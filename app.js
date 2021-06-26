const url = 'https://samaranand-blogs.herokuapp.com/api';
const root = document.getElementById('root')


const homePage = `<div id="values">
<div class="card mt-4">
    <div class="card-body"> 
        <h4 class="card-title" style="color: #0285dd;">
            title
        </h4>
        <div class="card-subtitle text-muted mb-2">
            article.createdAt
        </div>
        <div class="card-text mb-2">
            article.description
        </div>
        <button id="bac" class="btn btn-primary">i m button</button>
        <a href="/read.html" class="btn btn-primary" >Read More</a>
        
    </div>
</div>
<div class="card mt-4">
    <div class="card-body"> 
        <h4 class="card-title" style="color: #0285dd;">
            title
        </h4>
        <div class="card-subtitle text-muted mb-2">
            article.createdAt
        </div>
        <div class="card-text mb-2">
            article.description
        </div>
        <a href="#"  onclick=onNavItemClick('/read'); return false; class="btn btn-primary" >Read More__</a>
        
    </div>
</div>
</div>`


const blogPage=`<div class="container mt-3">
<h1 class="mb-1"><%= article.title %></h1>
<div class="text-muted mb-2"><%= article.createdAt.toLocaleDateString() %></div>
<a href="/" class="btn btn-secondary">All Articles</a>
<a href="/articles/edit/<%= article.id %>" class="btn btn-info mx-2">Edit</a>
<hr/>

<div class="container">
<%- article.sanitizedHtml %>
</div>`

const getElUI = (e) =>{
    return `<div class="card mt-4">
                <div class="card-body"> 
                    <h4 class="card-title" style="color: #0285dd;">
                        ${e.title}
                    </h4>
                    <div class="card-subtitle text-muted mb-2">
                        ${e.createdAt}
                    </div>
                    <div class="card-text mb-2">
                        ${e.description}
                    </div>
                    <a href="/read.html" class="btn btn-primary" >Read More</a>
                </div>
            </div>`
}

const updateEle = (El)=>{
    const elUI = getElUI(El);
    values.insertAdjacentHTML('beforeend', elUI)
}



const updateUI = (res)=>{
    res.forEach(el => updateEle(el))

}

const fetchData = async () =>{
    const val = await fetch(url);
    const re = await val.json()
    
    if(re.length > 0){
        console.log('i m back')
        updateUI(re)
    }
}



// document.getElementById('bac').addEventListener('click', (e)=>{
//     e.preventDefault();
//     console.log('hey clicked')
//     location.href = '/read.html'
//     location.hash = 'part'
// })


routes = {
    '/':homePage,
    '/read':blogPage
}



root.innerHTML = routes[window.location.pathname];
const values = document.getElementById('values')
fetchData();

let onNavItemClick = (pathName) => {
    window.history.pushState(
        {}, 
        pathName,
        window.location.origin + pathName
    );
    root.innerHTML = routes[pathName];
}

window.onpopstate = () => {
    root.innerHTML = routes[window.location.pathname];
};
  