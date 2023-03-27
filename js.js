
function start(num) {
    // state
    let data_state = []
    // 1 white 2 black
    let radius_state = 1
    // white and black count
    white_count = 0
    black_count = 0

    let box = document.querySelector('.box')
    box.innerHTML = ''
    for (let i = 0; i < num * num; i++) {
        data_state[i] = {
            state: 0,
            dely: 0,
        }
        let el = document.createElement('div')
        el.index = i
        el.setAttribute('index', i)
        // let size = Math.floor(100 / num)
        let size = (100 / num).toFixed(1)
        el.style.width = size + 'vmin'
        el.style.height = size + 'vmin'
        el.className = 'item'
        box.appendChild(el)
    }

    function find_cale(index) {
        // reset delay
        data_state.forEach(item => item.dely = 0)
        data_state[index].state = radius_state

        // find left position indexs
        let left_start = Math.floor(index / num) * num
        let left_indexs = []
        for (let i = index - 1; i >= left_start; i--) {
            left_indexs.push(i)
        }

        // find right position indexs
        let right_start = left_start + num - 1
        right_indexs = []
        for (let i = index + 1; i <= right_start; i++) {
            right_indexs.push(i)
        }

        // find top position indexs
        let top_indexs = []
        for (let i = index - num; i >= 0; i -= num) {
            top_indexs.push(i)
        }

        // find bottom position indexs
        let bottom_indexs = []
        for (let i = index + num; i < data_state.length; i += num) {
            bottom_indexs.push(i)
        }

        // find left top position indexs
        let left_top_indexs = []
        let left_top_index = index - num - 1
        while (left_top_index >= 0) {
            left_top_indexs.push(left_top_index)
            left_top_index -= num + 1
        }

        // find right top position indexs
        let right_top_indexs = []
        let right_top_index = index - num + 1
        while (right_top_index >= 0) {
            right_top_indexs.push(right_top_index)
            right_top_index -= num - 1
        }

        // find left bottom position indexs
        let left_bottom_indexs = []
        let left_bottom_index = index + num - 1
        while (left_bottom_index < data_state.length) {
            left_bottom_indexs.push(left_bottom_index)
            left_bottom_index += num - 1
        }

        // find right bottom position indexs
        let right_bottom_indexs = []
        let right_bottom_index = index + num + 1
        while (right_bottom_index < data_state.length) {
            right_bottom_indexs.push(right_bottom_index)
            right_bottom_index += num + 1
        }

        let for_indexs = function (left_indexs) {
            for (let i = 0; i < left_indexs.length; i++) {
                let index = left_indexs[i]
                if (data_state[index].state == 0) {
                    break
                }
                if (data_state[index].state == radius_state) {
                    for (let j = 0; j < i; j++) {
                        let index = left_indexs[j]
                        data_state[index].state = radius_state
                        data_state[index].dely = j + 1
                    }
                    break
                }
            }
        }
        for_indexs(left_indexs)
        for_indexs(right_indexs)
        for_indexs(top_indexs)
        for_indexs(bottom_indexs)
        for_indexs(left_bottom_indexs)
        for_indexs(right_bottom_indexs)
        for_indexs(left_top_indexs)
        for_indexs(right_top_indexs)
        
        // calc white and black count
        let {white_indexs,black_indexs} = data_state.reduce((count, item, index) => {
            if (item.state == 1) {
                count.white_indexs++
            }
            if (item.state == 2) {
                count.black_indexs++
            }
            return count
        },{white_indexs:0,black_indexs:0})
        white_count = white_indexs
        black_count = black_indexs

        // change state
        radius_state = radius_state == 1 ? 2 : 1
    }

    function render() {
        console.log(white_count)
        document.querySelector('#white_txt').innerHTML = white_count
        document.querySelector('#black_txt').innerHTML = black_count
        let box_item = box.querySelectorAll('.item')
        for (let i = 0; i < data_state.length; i++) {
            box_item[i].innerHTML = ''
            let el = null
            if (data_state[i].state == 1) {
                el = document.createElement('div')
                let className = 'radius white'
                if (data_state[i].dely) {
                    className += ' rotate'
                    el.style.animationDelay = data_state[i].dely * 0.1 + 's'
                }
                el.className = className
            }
            if (data_state[i].state == 2) {
                el = document.createElement('div')
                let className = 'radius black'
                if (data_state[i].dely) {
                    className += ' rotate'
                    el.style.animationDelay = data_state[i].dely * 0.1 + 's'
                }
                el.className = className
            }
            if (el) {
                box_item[i].appendChild(el)
            }
        }
    }
    render()

    box.onclick = function (e) {
        let target = e.target
        let index = target.index
        if (target.className != 'item') {
            return
        }
        find_cale(index)
        render()
    }
}

let start_btn = document.querySelector('#start_btn')
start_btn.onclick = function () {
    let input = document.querySelector('#num_input')
    let num = input.value || 9
    input.value = num

    start(num)
}
start_btn.click()

