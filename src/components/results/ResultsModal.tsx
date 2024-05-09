import { ButtonGroup, Modal, ModalFooter, ModalHeading, ModalRef, ModalToggleButton } from "@trussworks/react-uswds";
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";

function ResultsModal()  {
    const modalRef = useRef<ModalRef>(null);
    const navigate = useNavigate();

    return (
        <div>
      <div>
        <ModalToggleButton modalRef={modalRef} opener>
          Submit and see results
        </ModalToggleButton>
        <Modal ref={modalRef} id="example-modal-1" aria-labelledby="modal-1-heading" aria-describedby="modal-1-description">
          <ModalHeading id="modal-1-heading">
            Are you sure you want to submit and file your taxes?
          </ModalHeading>
          <div className="usa-prose">
            <p id="modal-1-description">
              Once you submit, you will not be able to make any changes.
            </p>
          </div>
          <ModalFooter>
            <ButtonGroup>
              <ModalToggleButton modalRef={modalRef} closer onClick={() => {
                    modalRef.current?.toggleModal();
                    navigate('/results') }}>
                Submit and see results
              </ModalToggleButton>
              <ModalToggleButton modalRef={modalRef} closer unstyled className="padding-105 text-center">
                Go back
              </ModalToggleButton>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      </div>
    </div>
    );
}

export default ResultsModal;