const url = 'https://samaranand-blogs.herokuapp.com/';
const values = document.getElementById('values')


const _createdAt = (v) =>{
    const d = new Date(v);
    return `${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()]} ${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth()).padStart(2, '0')}/${d.getFullYear()}`;
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
                    <a href="${url+'blogs/'+e.slug}" class="btn btn-primary">Read More</a>
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
    const val = await fetch(url+'api');
    const re = await val.json()
    
    if(re.length > 0){
        updateUI(re)
    }
}

console.log('hey')

fetchData();
