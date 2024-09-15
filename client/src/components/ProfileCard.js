import { Link } from "react-router-dom";
import { useAuth } from "../context and hooks/AuthContext";
import { Modal, Box } from "@mui/material";
import ModalButton from "./ModalButton";
import { useState } from "react";
import EditSighting from "./EditSighting";

function ProfileCard({sighting, setSightings, handleDeleteSightingClick}) {

    const [sightingModal, setSightingModal] = useState(false);
    const {name, image, id, trainer: user} = sighting;
    const {trainer} = useAuth();

    return (
        <div className="profile-card">
            <Link to={`/sightings/${id}`}><h2>{name}</h2>
            <img 
              src={image}
              alt={name}
              className="habitat-card"  
            />
            </Link>  
        {trainer.id === parseInt(user.id) && (
            <div className="profile-sighting">
                <ModalButton variant="contained" color="primary" onClick={() => setSightingModal(true)}>
                        Edit
                    </ModalButton>
                    <ModalButton variant="contained" color="primary" onClick={() => handleDeleteSightingClick(sighting)}>
                        Delete
                    </ModalButton>
            </div>
        )}
        <Modal
            open={sightingModal}
            onClose={() => setSightingModal(false)}
            aria-labelledby="edit-profile-modal-title"
            aria-describedby="edit-profile-modal-description"
        >
            <Box className="modal-box">
                <h2>Edit Sighting</h2>
                <ModalButton className="close-button" onClick={() => setSightingModal(false)} sx={{ mb: 2 }}>Close</ModalButton>
                <EditSighting
                    handleClick={() => setSightingModal(false)}
                    setSightings={setSightings}
                    sighting={sighting}
                />
            </Box>
        </Modal>
        </div>
    );
};

export default ProfileCard;