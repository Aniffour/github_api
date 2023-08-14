let btn = document.getElementById('search')
let  mainDev = document.querySelector('.main')
let input = document.getElementById('url')

btn.addEventListener(
    'click' ,
    _=>{
       let url = input.value
       if (url !== ''){
        let request = new Promise(
            (resolve  , reject)=>{
                let request = new XMLHttpRequest()
                request.open('GET', url)
                request.send()
                request.onload = _=>{if (request.readyState === 4 && request.status === 200){
                    resolve(request.responseText)
                }else {
                    reject('DATA NOT FOUND')
                }}
            }
        ).then(
            (data)=>{
                data = JSON.parse(data)
                return data
            }
        ).then(
            (finishData)=>{
                let list = [ 'id', 'node id',  'login' , 'site admin' , 'created at' , 'updated at' ,'public repos' , 'following' , 'followers' ]
                for (i in list){
                    let p = document.createElement('p')
                    p.id = i
                    p.innerText = `${list[i]} : ${finishData[list[i].replace(' ' , '_')]}`
                    document.body.append(p)
                }
            }
        ).catch(
           (reject)=>{
            let p =  document.createElement('p')
            p.innerText = reject
            document.body.append(p)
        }

        ).finally(
            _=> {
                let clearBtn = document.createElement('button')
                clearBtn.id = 'clear'
                clearBtn.innerText = 'clear'
                document.body.append(clearBtn)
                let clear = document.getElementById('clear')
                clear.addEventListener(
                    'click' , 
                    _=>{
                        location.reload()
                    }
                )
            }
        )
       }
    }
)
