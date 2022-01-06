let all_columns_list=document.getElementsByClassName('main_game')[0].children
let all_top_bar_circles_list=document.getElementsByClassName('top_bar')[0].children

/*-I have taken all the columns in a list. 
-I have taken all the circles in the top bar in another list.
-I have used for loop to add a 'mouseover & mouseout' eventlistener to
every single 'column element'
-When the mouse comes over a column element the background of
the corresponding 'top bar circle element' becomes background='red'
-When the mouse moves out, of the column element we delete the
background property of the corresponding 'top bar circle element' 
for good*/


//Now I will write code which will basically run the whole game
let positions_of_red=[]
let positions_of_blue=[]
let available_positions=[]
let turn='red'
for(let i=1;i<65;i++){//Here I add '1 to 64' numbers in available_positions
    available_positions.push(i)
}
//eventlisteners
for(let i=0;i < all_columns_list.length;i++){
    all_columns_list[i].addEventListener('click',drop_the_ball)
    all_columns_list[i].addEventListener('mouseover',hover_effect)
    all_columns_list[i].addEventListener('mouseout',()=>{
        all_top_bar_circles_list[i].style.removeProperty('background')
    })
}
document.getElementsByTagName('h2')[0].addEventListener('click',(e)=>{
    e.currentTarget.style.visibility='hidden'
    location.reload()
})
//eventhandler functions
function hover_effect(e){
    let index_of_top_bar_circle=e.currentTarget.className[e.currentTarget.className.length-1]-1
    all_top_bar_circles_list[index_of_top_bar_circle].style.background=turn
}
function drop_the_ball(e){
    let number_of_column=e.currentTarget.className[e.currentTarget.className.length-1]
    let available_positions_in_the_column=[]
    available_positions_in_the_column=available_positions.filter((x)=>{
        if(x <= number_of_column*6 && x >= number_of_column*6-5){
            return true
        }
    })
    let position=Math.max(...available_positions_in_the_column)
    if(available_positions_in_the_column.length > 0){
        available_positions.splice(available_positions.indexOf(position),1)
        if(turn=='red'){
            positions_of_red.push(position)
            let circle_number_in_the_column=((position % 6)==0) ? 6 : (position % 6)
            e.currentTarget.children[circle_number_in_the_column-1].style.background='red'
            let index_of_top_bar_circle=e.currentTarget.className[e.currentTarget.className.length-1]-1
            all_top_bar_circles_list[index_of_top_bar_circle].style.background='blue'
            if(win_status(position,turn)==true){
                document.getElementsByTagName('h1')[0].style.visibility='visible'
                document.getElementsByTagName('h2')[0].style.visibility='visible'
                document.getElementsByTagName('h1')[0].textContent='Red has won the game!'
                remove_all_event_listeners()
            }
            turn='blue'
        }else if(turn=='blue'){
            positions_of_blue.push(position)
            let circle_number_in_the_column=((position % 6)==0) ? 6 : (position % 6)
            e.currentTarget.children[circle_number_in_the_column-1].style.background='blue'
            let index_of_top_bar_circle=e.currentTarget.className[e.currentTarget.className.length-1]-1
            all_top_bar_circles_list[index_of_top_bar_circle].style.background='red'
            if(win_status(position,turn)==true){
                document.getElementsByTagName('h1')[0].style.visibility='visible'
                document.getElementsByTagName('h2')[0].style.visibility='visible'
                document.getElementsByTagName('h1')[0].textContent='Blue has won the game!'
                remove_all_event_listeners()
            }
            turn='red'
        }
    }
}
//"win check" functions
function horizontal_right_check(position,colour){
    if(position <= 24){
        if(colour=='red'){
            if(positions_of_red.indexOf(position+6)!=-1 && positions_of_red.indexOf(position+12)!=-1 && positions_of_red.indexOf(position+18)!=-1){
                return true
            }
        }else if(colour=='blue'){
            if(positions_of_blue.indexOf(position+6)!=-1 && positions_of_blue.indexOf(position+12)!=-1 && positions_of_blue.indexOf(position+18)!=-1){
                return true
            }
        }
    }
    return false
}
function horizontal_left_check(position,colour){
    if(position >= 19){
        if(colour=='red'){
            if(positions_of_red.indexOf(position-6)!=-1 && positions_of_red.indexOf(position-12)!=-1 && positions_of_red.indexOf(position-18)!=-1){
                return true
            }
        }else if(colour=='blue'){
            if(positions_of_blue.indexOf(position-6)!=-1 && positions_of_blue.indexOf(position-12)!=-1 && positions_of_blue.indexOf(position-18)!=-1){
                return true
            }
        }
    }
    return false
}
function vertical_up_check(position,colour){
    if(position%6==0 || position%6==4 || position % 6==5){
        if(colour=='red'){
            if(positions_of_red.indexOf(position-1)!=-1 && positions_of_red.indexOf(position-2)!=-1 && positions_of_red.indexOf(position-3)!=-1){
                return true
            }
        }else if(colour=='blue'){
            if(positions_of_blue.indexOf(position-1)!=-1 && positions_of_blue.indexOf(position-2)!=-1 && positions_of_blue.indexOf(position-3)!=-1){
                return true
            }
        }
    }
    return false
}
function vertical_down_check(position,colour){
    if(position%6==1 || position%6==2 || position % 6==3){
        if(colour=='red'){
            if(positions_of_red.indexOf(position+1)!=-1 && positions_of_red.indexOf(position+2)!=-1 && positions_of_red.indexOf(position+3)!=-1){
                return true
            }
        }else if(colour=='blue'){
            if(positions_of_blue.indexOf(position+1)!=-1 && positions_of_blue.indexOf(position+2)!=-1 && positions_of_blue.indexOf(position+3)!=-1){
                return true
            }
        }
    }
    return false
}
function diagonal_top_right_check(position,colour){
    if((position%6==0 || position%6==4 || position % 6==5)&& position<=24){
        if(colour=='red'){
            if(positions_of_red.indexOf(position+5)!=-1 && positions_of_red.indexOf(position+10)!=-1 && positions_of_red.indexOf(position+15)!=-1){
                return true
            }
        }else if(colour=='blue'){
            if(positions_of_blue.indexOf(position+5)!=-1 && positions_of_blue.indexOf(position+10)!=-1 && positions_of_blue.indexOf(position+15)!=-1){
                return true
            }
        }
    }
    return false
}
function diagonal_top_left_check(position,colour){
    if((position%6==0 || position%6==4 || position % 6==5)&& position>=22){
        if(colour=='red'){
            if(positions_of_red.indexOf(position-7)!=-1 && positions_of_red.indexOf(position-14)!=-1 && positions_of_red.indexOf(position-21)!=-1){
                return true
            }
        }else if(colour=='blue'){
            if(positions_of_blue.indexOf(position-7)!=-1 && positions_of_blue.indexOf(position-14)!=-1 && positions_of_blue.indexOf(position-21)!=-1){
                return true
            }
        }
    }
    return false
}
function diagonal_bottom_right_check(position,colour){
    if((position%6==1 || position%6==2 || position % 6==3)&& position<=21){
        if(colour=='red'){
            if(positions_of_red.indexOf(position+7)!=-1 && positions_of_red.indexOf(position+14)!=-1 && positions_of_red.indexOf(position+21)!=-1){
                return true
            }
        }else if(colour=='blue'){
            if(positions_of_blue.indexOf(position+7)!=-1 && positions_of_blue.indexOf(position+14)!=-1 && positions_of_blue.indexOf(position+21)!=-1){
                return true
            }
        }
    }
    return false
}
function diagonal_bottom_left_check(position,colour){
    if((position%6==1 || position%6==2 || position % 6==3)&& position>=19){
        if(colour=='red'){
            if(positions_of_red.indexOf(position-5)!=-1 && positions_of_red.indexOf(position-10)!=-1 && positions_of_red.indexOf(position-15)!=-1){
                return true
            }
        }else if(colour=='blue'){
            if(positions_of_blue.indexOf(position-5)!=-1 && positions_of_blue.indexOf(position-10)!=-1 && positions_of_blue.indexOf(position-15)!=-1){
                return true
            }
        }
    }
    return false
}

function win_status(position,colour){
    if(horizontal_right_check(position,colour)||
    horizontal_left_check(position,colour)||
    vertical_up_check(position,colour)||
    vertical_down_check(position,colour)||
    diagonal_top_right_check(position,colour)||
    diagonal_top_left_check(position,colour)||
    diagonal_bottom_right_check(position,colour)||
    diagonal_bottom_left_check(position,colour)){
        return true
    }else{
        return false
    }
}
//function to remove all event listeners at the end of the game
function remove_all_event_listeners(){
    for(let i=0;i < all_columns_list.length;i++){
        all_columns_list[i].removeEventListener('click',drop_the_ball)
        all_columns_list[i].removeEventListener('mouseover',hover_effect)
    }
}
