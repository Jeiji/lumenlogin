import React from 'react';
import Modal from 'react-awesome-modal';

function ErrorModal(props) {

   function openModal() {
        this.setState({
            visible : true
        });
    }
  
   function closeModal() {
        this.setState({
            visible : false
        });
    }


    return ( <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()} >
                    <div class="mode">
                        <h1>Nope.</h1>
                        <p>{this.state.responseError}</p>
                        <a onClick={this.closeModal}>Close</a>
                    </div>
                </Modal>
                )

    
    
}

export default ErrorModal

