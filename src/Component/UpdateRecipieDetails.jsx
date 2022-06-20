
import React from 'react'

const UpdateRecipieDetails = ({handleChange, onSubmit, currentRecipie}) => {
  return (

    <div className="rec-detail-container">
    <form>

      <div className="form-control rec-name">
       <input type="text" value={currentRecipie.name} onChange={(e) => handleChange({e, key:"name"}) }/>
      </div>

      <div className="form-control rec-prep">
       <input type="text" value={currentRecipie.prepTime} onChange={(e) => handleChange({e, key:"prepTime"})}/>
      </div>

      <div className="form-control rec-cooking-time">
       <input type="text" value={currentRecipie.cookTime} onChange={(e) => handleChange({e, key:"cookTime"})}/>
      </div>
     
      <div className="form-control rec-desc">
       <input type="text" value={currentRecipie.desc} onChange={(e) => handleChange({e, key:"desc"})}/>
      </div>

      <input type="submit" value="Enregistrer" onClick={(e) => onSubmit(e)}/>

    </form>
  </div>

  )
}

export default UpdateRecipieDetails