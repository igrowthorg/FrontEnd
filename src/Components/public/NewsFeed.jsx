import React, { useEffect, useState } from 'react';
import './news.scss';
import { CiTrash } from 'react-icons/ci';
import instance from '../../utility/AxiosInstance';

const NewsCard = (props) => {
    const deleteNews = async () => {
         // Check if the user can delete news
        const hasPrivilege = props.user === 'admin' || props.user === 'midwife' || props.user === 'officer';

        if (hasPrivilege) {
            //confirmation before deleting
            const confirmDelete = window.confirm(`Are you sure, you want to delete "${props.title}"?`);

            if (confirmDelete) {
                try {
                    let apiUrl;
                    if (props.user === 'admin') {
                        apiUrl = `admin/news/${props.news_id}`;
                    } else if (props.user === 'midwife') {
                        apiUrl = `midwife/news/${props.news_id}`;
                    } else if (props.user === 'officer') {
                        apiUrl = `/officer/news/${props.news_id}`;
                    }

                    const res = await instance.delete(apiUrl);
                    // alert(res.data.message);
                    props.trigger((prev) => !prev);
                } catch (err) {
                    console.log(err);
                }
            }
            else {
                alert("Deletion canceled");
            }
        } else {
            alert(`You Don't Have Privilege to Delete "${props.title}"`);
        }
    };

    return (
        <div className="news">
            <div className="image">
                {/* Display the news image */}
                <img src={`http://localhost:3005/public/image/${props.image}`} alt="sample_image" />
            </div>

            <div className="content">
            <div className='sub_content'>

                {/* Display news delete icon for privilege users */}
                <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {props.title} <CiTrash color="red" size={22} className="bin-icon" onClick={deleteNews} />
                </h2>
                
                <p className="discretion">{props.summary}</p>
                <p className="date">{props.date}</p>
            </div>
            </div>
        </div>
    );
};

//Displaying a list of news
const NewsFeed = (props) => {
    const [news, setNews] = useState([]);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const getAllNews = async () => {
            try {
                const res = await instance.get('public/news');
                setNews(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        getAllNews();
    }, [trigger]);

    // Display message if there are no news 
    if(news.length === 0){
        return(
            <div className='newsFeed-container'>
                <div className='card-fram'>
                    <h1 style={{fontSize: 25}}>No News</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="newsFeed-container">
            <div className="card-fram">
                {news.map((item, index) => {
                    const date = item.date.split('T')[0];
                    return (
                        <div key={item.news_id}>
                        {/* Render NewsCard for each news */}
                            <NewsCard
                                title={item.title}
                                trigger={setTrigger}
                                news_id={item.news_id}
                                summary={item.summary}
                                date={date}
                                image={item.image}
                                user={props.user}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NewsFeed;


