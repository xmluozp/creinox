

import React from 'react';
import { Link } from 'react-router-dom';
import { Button,  Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


export const MyModalForm = ({isOpen, title = "",onClose, rowButtons=[], className, component}) => {

    const pageId = 0;

    return (
                <Modal isOpen={isOpen} toggle={onClose} className={'modal-lg ' + className}>
                  <ModalHeader toggle={onClose}>{title}</ModalHeader>
                  <ModalBody>
                    {component}
                  </ModalBody>
                  <ModalFooter>
                   {
                        rowButtons.map((buttonObj, index) => <ActionButton key={`button_${pageId}_${index}`} {...buttonObj} id={pageId}/>)
                   }
                  </ModalFooter>
                </Modal>
    )
}

const ActionButton = ({ id, label, onClick, color, url, icon }) => {

    let returnValue = label;
    if (url) {
  
      returnValue = <Link to={`${url}/${id}`} className={`btn btn-sm btn-${color}`}
        role="button" style={{ margin: "0px 0px 0px 3px" }} aria-pressed="true">{icon}{label}</Link>
    } else {
      const propsOnClick = typeof (onClick) === 'function' ? onClick.bind(null, id) : null;
  
      returnValue = (<Button style={{ margin: "0px 0px 0px 3px" }} className={`btn btn-sm btn-${color}`}
        onClick={propsOnClick}> {icon}{label}</Button>)
    }
  
    return returnValue
  }


export const withMyModalForm = (insideComponent) => {

}