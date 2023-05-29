import "../CssFiles/videoSearch.css";

const VideosPage = () => {
    return ( 
        <div className="videoSearchContainer">
            <input type="text" name="search" placeholder="search for video"/>
            <h4 style={{textAlign: "center", margin: "15px 0"}}>Results for "Search..."</h4>
            <div id="videoSearchResults">
                <div className="videoResult">
                </div>
                <div className="videoResult">
                </div>
                <div className="videoResult">
                </div>
                <div className="videoResult">
                </div>
                <div className="videoResult">
                </div>
                <div className="videoResult">
                </div>
                <div className="videoResult">
                </div>
                <div className="videoResult">
                </div>
            </div>
        </div>
    );
}
 
export default VideosPage;