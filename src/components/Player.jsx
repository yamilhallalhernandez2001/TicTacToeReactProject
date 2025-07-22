import { useState } from "react";

export default function Player ({name,symbol,isActive,onChangeName})
{
    const [isEditing, setIsEditing] = useState(false);
    const [playerName,setPlayerName] = useState(name);
    const handleEdit = () =>{
        setIsEditing((editing) => !editing);
        if(isEditing){
            onChangeName(symbol,playerName);
        }
    }
    const handleChangeInput = (event) =>{
        setPlayerName(event.target.value);
    }

    return(
        <li className={isActive ? 'active' : ''}>
            <span className="player">
                {
                    !isEditing ? <span className="player-name">{playerName}</span> : <input onChange={handleChangeInput} type="text" value={playerName} required />
                }

                <span className="player-symbol">{symbol}</span>
            </span>
             <button onClick={handleEdit}>{!isEditing ? 'Edit' : 'Save'}</button> 
            

        </li>
    );
}