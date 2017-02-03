function sayHello() {
    alert("hello asdfasdf");
}
document.getElementById("test").addEventListener("click", sayHello);

function update(jscolor) {
    document.getElementById("test").innerHTML = jscolor;
}