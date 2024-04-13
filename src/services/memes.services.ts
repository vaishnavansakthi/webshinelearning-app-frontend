import axiosInstance from "../utils/apiFetch";

async function createMemes(id: number, file: any) {
    try {
        
        const response = await axiosInstance.post(`/memes/cloudinary/${id}`, file, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        return response;
    } catch (error) {
        console.error("Error uploading meme:", error);
        throw error;
    }
}

async function getAllMemes() {
    try {
        const response = await axiosInstance.get("/memes");
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

async function deleteMemes(id: number) {
    try {
        const response = await axiosInstance.delete(`/memes/${id}`);
        return response;
    } catch (error) {
        console.error("Error deleting meme:", error);
        throw error;
    }
}

export {
    createMemes,
    getAllMemes,
    deleteMemes
}
