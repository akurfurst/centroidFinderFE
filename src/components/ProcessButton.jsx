

export default function ProcessButton({videoPath, targetColor, threshold, setUrl, error}){
    //const nav = useNavigate();
    
    function handelClick(){
        setUrl(`http://localhost:4002/process/${videoPath}?targetColor=${targetColor}&threshold=${threshold}`)
    }
    
    // useEffect(() => {
    //     if(data && data.jobId){
    //         nav(`/process/${data.jobId}`);
    //     }
    // }, [data, nav]);

    return(
        <div className="process-button">
            <button onClick={handelClick}>Process Video</button>

            {error && <p>Error: {error}</p>}
        </div>
    );
}