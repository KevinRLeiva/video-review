const submit = document.querySelector("button");

submit.addEventListener("click",function(){
    const name = document.querySelector("input[name=name]").value;
    const title = document.querySelector("input[name=title]").value;
    const comments = document.querySelector("input[name=comment]").value;
    fetch('comments', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'title': title,
        'name': name,
        'comments': comments,
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      window.location.reload(true)
    })
    .catch(err => console.log(err))
});
