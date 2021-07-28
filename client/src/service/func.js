export const add = async (url, userDetails, token=null) => {

    const res = await fetch("http://localhost:5000" + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": token,
        },
        body: JSON.stringify(userDetails),
    });
    if (res.status === 500){
        alert("Sorry, we encountered a problem, please try again later")
    }
    const data = await res.json();
    return [data, res.status];
};
export const update = async (url,userDetails, token = null) => {

    const res = await fetch("http://localhost:5000"+url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "token": token,
        },
        body: JSON.stringify(userDetails),
    });
    if (res.status === 500){
        alert("Sorry, we encountered a problem, please try again later")
    }
    const data = await res.json();
    return [data, res.status];
};
export const getItem = async (url)=>{
    const res = await fetch("http://localhost:5000"+url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();
    return data;
}

export const deleteItem = async (url, userDetails, token = null) => {
    const res = await fetch("http://localhost:5000"+url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "token": token,
        },
    body: JSON.stringify(userDetails),
    });
    if (res.status === 500){
        alert("Sorry, we encountered a problem, please try again later")
    }
    const data = await res.json();
    return [data, res.status];
};