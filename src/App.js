import React, {useState, useEffect, useRef} from 'react';
import './App.css';

function App() {
 const [edit, setEdit] = useState(false);
 const [product, setProduct]=useState({
    img: 'https://upweek.ru/wp-content/uploads/2019/12/Warcraft_III_Reforged_Logo.png',
    title:'Warcraft III Reforged',
    company:'Blizzard',
    status: 'inProgress'
  });
  const ref=useRef(null);
  const statusList=['inProgress', 'Beta', 'Selling'];

  const outsideClick= e => {
    if (ref.current && !ref.current.contains(e.target)){
      setEdit(false)
    }
  };

  useEffect(() => {
    document.addEventListener('click', outsideClick);
    return ()=>document.removeEventListener('click', outsideClick);
  });

  const updateProduct = (field,value)=>{
    setProduct({...product, [field]:value})
  };
  return (
    <div className={'' + (edit ? ' widget' : '')} ref={ref}>
        <div className={'window'} onClick={()=>setEdit(!edit)}>
            <div className={'img'} style={{background: 'url('+product.img+') center/cover no-repeat'}}></div>
            <div>
              <h3 className={'title'}>{product.title}</h3>
              <h4 className={'company'}>{product.company}</h4>
              <p className={'status'}>{product.status}</p>
            </div>
        </div>
       {edit &&(
             <div className={'popover'}>
                <span>Title</span>
                <input 
                type="text" 
                value={product.title} 
                onChange={e=> updateProduct ("title", e.target.value)} 
                />                    
                <span>Company</span>
                <input 
                    type="text"
                    value={product.company}
                    onChange={e=> updateProduct ("company", e.target.value)}
                    />
                <span>Status</span>
                <ul>
                  {statusList.map(status => 
                    <li className={product.status === status ? 'active' : ''} 
                        key={status} 
                        onClick= {()=> updateProduct( "status", status)}>
                        {status}
                    </li>)}
                </ul>
              </div>
          )}
    </div>
  );
}

export default App;
