document.addEventListener("DOMContentLoaded", function(){
    
    const delUserIcon = document.querySelectorAll(".fa-trash");
    delUserIcon.forEach(el => {
        console.log(el)
        
        el.addEventListener("click", function(e){
            console.log(e.target.dataset.id)
            fetch("http://localhost:9000/admin/user/delete/" + e.target.dataset.id, {method: "DELETE"} )
            .then(() =>location.reload())
        })
    });
});