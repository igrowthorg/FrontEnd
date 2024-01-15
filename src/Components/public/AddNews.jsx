import React from 'react'
import './addNews.scss'
import instance from '../../utility/AxiosInstance'

const AddNews = () => {

    //Handle Form Submission 
    const submit = async (e) => {
        e.preventDefault();

        //Form Data Preparation
        const formData = {
            title: e.target['news-title'].value,
            summary: e.target['news-content'].value,
            description: " ",
            file: e.target['news-image-file'].files[0]
        }

        try {

            const header = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const res = await instance.post('/admin/add-news', formData, header);
            console.log(res.data);

            if (res.status === 200) {
                alert('Item Added Successfully');
                // Reset the form
                document.getElementById("news-send").reset();
            }
        }
        catch (err) {
            console.log(err.response.data.message);
            alert(err.response.data.message);
        }
    }

    return (
        //Add news container
        <div className='addNew-container'>
            <div id='add-news'>
                <h3>Add News</h3>
                <form onSubmit={submit} id='news-send'>
                    <div className="row">
                        <label htmlFor="news-title">Title</label>
                        <input type="text" name='news-title' id='news-title' placeholder='Enter News Title' required />
                    </div>

                    <div className="row">
                        <label htmlFor="news-content">News Content</label>
                        <textarea name="news-content" id="news-content" cols="30" rows="10" placeholder='Enter News Content' required></textarea>
                    </div>

                    <div className="row">
                        <label htmlFor="news-image-file">Choose Image</label>
                        <input type="file" name='news-image-file' id='news-image-file' required />
                    </div>

                    <div className="row submit-button">
                        <input type="submit" value="Add News" className='submit-btn' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNews