<?php
 
function downloadJs($file_url, $save_to)
{
    $content = file_get_contents($file_url);
    file_put_contents($save_to, $content);
}
 

downloadJs('https://static.doubleclick.net/instream/ad_status.js', realpath("./js") . '/ad_status.js');
 

 
?>