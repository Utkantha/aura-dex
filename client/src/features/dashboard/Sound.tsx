import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/utils';
import { Volume2Icon } from 'lucide-react';
import React from 'react';
// import toast from 'react-hot-toast';

interface PokemonSoundButtonProps {
    soundUrl?: string;
}

const PokemonSoundButton: React.FC<PokemonSoundButtonProps> = ({ soundUrl }) => {
    const playSound = () => {
        if (!soundUrl) {
            // toast.error("No sound available for this Pokémon.");
            showToast("No sound available for this Pokémon.", "error")
            return;
        }

        try {
            const audio = new Audio(soundUrl);

            audio.onerror = () => {
                showToast("Failed to load the sound.", "error")
                // toast.error("");
            };

            // audio.onended = () => {
            //     showToast("Sound played successfully!", "success");
            // };

            audio.play().catch((err) => {
                console.error("Audio playback failed:", err);
                showToast("Playback failed. Try again.", "error");
            });
        } catch (error) {
            console.error("Unexpected error:", error);
            showToast("Something went wrong.", "error");
        }
    };

    return (
        <Button
            onClick={playSound}
            variant={"outline"}
            className=" transition"
        >
            <Volume2Icon />
        </Button>
    );
};

export default PokemonSoundButton;
