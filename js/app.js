const url = 'https://samaranand-blogs.herokuapp.com/';
const root = document.getElementById('root')

const res = []

// const homeContent = `<div class="card mt-4">
// <div class="card-body"> 
//     <h4 class="card-title" style="color: #0285dd;">
//         e.title}
//     </h4>
//     <div class="card-subtitle text-muted mb-2">
//          _createdAt(e.createdAt)}
//     </div>
//     <div class="card-text mb-2">
//         e.description}
//     </div>
//     <a href="url+'blogs/'+e.slug}" class="btn btn-primary">Read More</a>
//     <a href="#" onclick="onNav('/read/bootstrap'); return false;" class="btn btn-secondary">All</a>
// </div>
// </div>`


const _createdAt = (v) =>{
    const d = new Date(v);
    return `${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()]} ${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth()).padStart(2, '0')}/${d.getFullYear()}`;
}

const readContent = (el)=>{
    return `<h1 class="mb-1">${el.title}</h1>
<div class="text-muted mb-2">${_createdAt(el.createdAt)}</div>
<a href="#" onclick="onNav('/blogs'); return false;" class="btn btn-secondary">All Articles</a>
<hr/>

<div class="container">
    ${el.data}
</div>`

}






const getElUI = (e) =>{
    return `<div class="card mt-4">
                <div class="card-body"> 
                    <h4 class="card-title" style="color: #0285dd;">
                        ${e.title}
                    </h4>
                    <div class="card-subtitle text-muted mb-2">
                        ${ _createdAt(e.createdAt)}
                    </div>
                    <div class="card-text mb-2">
                        ${e.description}
                    </div>
                    <a href="#" onclick="onNav('/blogs/${e.slug}'); return false;" class="btn btn-primary">Read More</a>
                </div>
            </div>`
}

const updateEle = (El)=>{
    const elUI = getElUI(El);
    root.insertAdjacentHTML('beforeend', elUI)
}


const updateUI = (res)=>{
    res.forEach(el => updateEle(el))

}

const homeContent = ()=>{
    if(res.length>0){
        let str = ''
        res.forEach(e=> str += getElUI(e))
        return str
    } else {
        alert('Something went wrong..!! please try after sometime !!')
    }
}




// console.log(window.location.pathname)



const onNav = pathname =>{
    if(pathname==='/'){
        onNav('/blogs')
    }
    if(pathname==='/blogs/' || pathname==='/blogs'){
        window.history.pushState(
            {},
            pathname,
            window.location.origin+pathname
        )
        root.innerHTML = homeContent()
    } else {
        const tmpPath = pathname.split('/')
        const slug = tmpPath[2]
        const t = res.filter(e=> e.slug === slug)
        if(t.length>0){
            window.history.pushState(
                {},
                pathname,
                window.location.origin+pathname
            )
            // pathname = '/read'
            root.innerHTML = readContent(t[0])
        }
        
    }
}

window.onpopstate = () => {
    console.log('pop' + window.location.pathname)
    onNav(window.location.pathname)
    // root.innerHTML = routes[window.location.pathname]
}

const fetchData = async () =>{
    const val = await fetch(url+'api');
    const re = await val.json()
    re.forEach(e => res.push(e))
    // root.innerHTML = routes[window.location.pathname]()    
    onNav(window.location.pathname)

    // if(re.length > 0){
    //     updateUI(re)
    // }
}


fetchData();
