import { ButtonGroup, Modal, ModalFooter, ModalHeading, ModalRef, ModalToggleButton } from "@trussworks/react-uswds";
import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { calculateAndSaveTaxReturnsForUser } from "../../api/resultsApi";

function ResultsModal()  {
    const modalRef = useRef<ModalRef>(null);
    const navigate = useNavigate();
    const userId = useSelector((state: RootState) => state.auth.userId);

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
                    if (!userId || userId === 0) {
                        return;
                    }
                    calculateAndSaveTaxReturnsForUser(userId)
                        .then((res) => {
                            console.log(res);
                            modalRef.current?.toggleModal();
                            navigate('/results');
                        })
                        .catch((err) => {
                            console.error(err);
                        }
                    );
                }}>
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