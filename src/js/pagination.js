const pagination = document.querySelector("ul");

export function createPagination(total, page){
    let paginationMark = '';        
        if (page <= 3) {           
            if (page === 1){
                if(total === 0){
                    paginationMark = "";
                    pagination.innerHTML = paginationMark;
                }   
                else if (total === 1){
                    paginationMark = `        
                    <li class='first page active-page' data-id="${page}"> ${page} </li>
                    ` 
                    pagination.innerHTML = paginationMark;
                }else if (total === 2){
                    paginationMark = `        
                    <li class='first page active-page' data-id="${page}"> ${page} </li>
                    <li class='last page' data-id="${total}"> ${total} </li>
                    ` 
                    pagination.innerHTML = paginationMark;
                }else if (total === 3){
                    paginationMark = `        
                    <li class='first page active-page' data-id="${page}"> ${page} </li>
                    <li class='page' data-id="${page+1}"> ${page+1} </li>
                    <li class='last page' data-id="${total}"> ${total} </li>
                    ` 
                    pagination.innerHTML = paginationMark;
                }else if (total === 4){
                    paginationMark = `        
                    <li class='first page active-page' data-id="${page}"> ${page} </li>
                    <li class='page' data-id="${page+1}"> ${page+1} </li>
                    <li class='page' data-id="${page+2}"> ${page+2} </li>
                    <li class='last page' data-id="${total}"> ${total} </li>
                    ` 
                    pagination.innerHTML = paginationMark;
                }

                else {
                    paginationMark = `        
                    <li class='first page active-page' data-id="${page}"> ${page} </li>                  
                    <li class='page' data-id="${page+1}"> ${page+1} </li>
                    <li class='page' data-id="${page+2}"> ${page+2} </li>   
                    <li class='page' data-id="${page+3}"> ${page+3} </li>             
                    <li class='dots'> ... </li>
                    <li class='last page' data-id="${total}"> ${total} </li>
                    ` 
                    pagination.innerHTML = paginationMark;
                }
               
            } else if(page === 2) {                
                if (total === 2){
                    paginationMark = `        
                    <li class='first page' data-id="1"> 1 </li>  
                    <li class='page active-page' data-id="${page}"> ${page} </li>
                    ` 
                    pagination.innerHTML = paginationMark;
                }else if (total === 3){
                    paginationMark = `        
                    <li class='first page' data-id="1"> 1 </li>  
                    <li class='page active-page' data-id="${page}"> ${page} </li>
                    <li class='last page' data-id="${total}"> ${total} </li>
                    ` 
                    pagination.innerHTML = paginationMark;
                }else if (total === 4){
                    paginationMark = `        
                    <li class='first page' data-id="1"> 1 </li>  
                    <li class='page active-page' data-id="${page}"> ${page} </li>
                    <li class='page' data-id="${page+1}"> ${page+1} </li>
                    <li class='last page' data-id="${total}"> ${total} </li>
                    ` 
                    pagination.innerHTML = paginationMark;
                }else {
                    paginationMark = `
                    <li class='first page' data-id="1"> 1 </li>                  
                    <li class='page active-page' data-id="${page}"> ${page} </li>
                    <li class='page' data-id="${page+1}"> ${page+1} </li>   
                    <li class='page' data-id="${page+2}"> ${page+2} </li>             
                    <li class='dots'> ... </li>
                    <li class='last page' data-id="${total}"> ${total} </li>
                    `
                    pagination.innerHTML = paginationMark;
                    }
                
            } else{
                if (total === 3){
                    paginationMark = `
                    <li class='first page' data-id="1"> 1 </li>                  
                    <li class='page' data-id="${page -1}"> ${page-1} </li>
                    <li class='page active-page' data-id="${page}"> ${page} </li>                   
                    `
                    pagination.innerHTML = paginationMark;
                }else{
                    paginationMark = `
                    <li class='first page' data-id="1"> 1 </li>                  
                    <li class='page' data-id="${page -1}"> ${page-1} </li>
                    <li class='page active-page' data-id="${page}"> ${page} </li>   
                    <li class='page' data-id="${page+1}"> ${page+1} </li>
                    <li class='page' data-id="${page+2}"> ${page+2} </li>              
                    <li class='dots'> ... </li>
                    <li class='last page' data-id="${total}"> ${total} </li>
                    `
                    pagination.innerHTML = paginationMark;
                }               
            }           
        }       

        //--------------------------------------------------------
        if (page >= 4) {
            if (page === 4){
                if(total === 4){
                paginationMark = `
                <li class='first page' data-id="1"> 1 </li>                  
                <li class='page' data-id="${page-2}"> ${page-2} </li>
                <li class='page' data-id="${page-1}"> ${page-1} </li>
                <li class='page active-page' data-id="${page}"> ${page} </li>                   
                `
                pagination.innerHTML = paginationMark;

                }else{
                paginationMark = `
                <li class='first page' data-id="1"> 1 </li>                  
                <li class='page' data-id="${page-2}"> ${page-2} </li>
                <li class='page' data-id="${page-1}"> ${page-1} </li>
                <li class='page active-page' data-id="${page}"> ${page} </li>   
                <li class='page' data-id="${page+1}"> ${page+1} </li>
                <li class='page' data-id="${page+2}"> ${page+2} </li>              
                <li class='dots'> ... </li>
                <li class='last page' data-id="${total}"> ${total} </li>
                `
                pagination.innerHTML = paginationMark;
                }
                 
            } else if(page === total){
                paginationMark = `
                <li class=' first page' data-id="1"> 1 </li> 
                <li class='dots'> ... </li>   
                <li class='page' data-id="${page-3}"> ${page-3} </li>              
                <li class='page' data-id="${page-2}"> ${page-2} </li>
                <li class='page' data-id="${page-1}"> ${page-1} </li>
                <li class='last page active-page' data-id="${total}"> ${total} </li>
                `
                pagination.innerHTML = paginationMark; 
            } else if(page === total - 1){
                paginationMark = `
                <li class='first page' data-id="1"> 1 </li> 
                <li class='dots'> ... </li>
                <li class='page' data-id="${page-2}"> ${page-2} </li>              
                <li class='page' data-id="${page-1}"> ${page-1} </li>
                <li class='page active-page' data-id="${page}"> ${page} </li>
                <li class='last page' data-id="${total}"> ${total} </li>
                `
                pagination.innerHTML = paginationMark; 
            } else if(page === total - 2){
                paginationMark = `
                <li class='first page' data-id="1"> 1 </li> 
                <li class='dots'> ... </li>
                <li class='page' data-id="${page-2}"> ${page-2} </li> 
                <li class='page' data-id="${page-1}"> ${page-1} </li>              
                <li class='page active-page' data-id="${page}"> ${page} </li>
                <li class='page' data-id="${page+1}"> ${page+1} </li>
                <li class='last page' data-id="${total}"> ${total} </li>
                `
                pagination.innerHTML = paginationMark; 
            } else if(page === total - 3){
                paginationMark = `
                <li class=' first page' data-id="1"> 1 </li> 
                <li class='dots'> ... </li>
                <li class='page' data-id="${page-2}"> ${page-2} </li> 
                <li class='page' data-id="${page-1}"> ${page-1} </li>              
                <li class='page active-page' data-id="${page}"> ${page} </li>
                <li class='page' data-id="${page+1}"> ${page+1} </li>
                <li class='page' data-id="${page+2}"> ${page+2} </li>
                <li class='last page' data-id="${total}"> ${total} </li>
                `
                pagination.innerHTML = paginationMark; 
            }
            else {
            paginationMark = `
                <li class='first page' data-id="1"> 1 </li>                  
                <li class='dots'> ... </li>
                <li class='page' data-id="${page -2}"> ${page-2} </li>
                <li class='page' data-id="${page-1}"> ${page-1} </li>
                <li class='page active-page' data-id="${page}"> ${page} </li>   
                <li class='page' data-id="${page+1}"> ${page+1} </li>
                <li class='page' data-id="${page+2}"> ${page+2} </li>              
                <li class='dots'> ... </li>
                <li class='last page' data-id="${total}"> ${total} </li>
                `
                pagination.innerHTML = paginationMark; 
            }
        }
    }
