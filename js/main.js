
// set decleration of  global variables 
var SiteName = document.getElementById("sitename");
var SiteUrl = document.getElementById("siteurl");
var SiteCategory = document.getElementById("sitecategory");
var inputsearch=document.getElementById("inputsearch");
var AllSites = []; // empty  arry to contain objects of site  


if(localStorage.getItem(`Allsites`)!=null){
    AllSites=JSON.parse(localStorage.getItem(`Allsites`));
    DisplayAllSites();


}
// function  submition   
//start  with declare object  that carry proprities of site (name - url -category )
//assign  values of html element that get values to store into proprities of object 
//add site object in  array with method push 
function submitsite() {


    var site = {
        name: SiteName.value,
        url: SiteUrl.value,
        category: SiteCategory.value,
    }

//add object
    AllSites.push(site);
    localStorage.setItem(`Allsites`,JSON.stringify(AllSites));
    console.log(AllSites);

// display object proprities in table view  
    DisplayAllSites();
// empty  value of html elements after adding 
     cleartbody();



}



// function بتفضى  الانبوت  تانى  من اول  وجديد عشان تكتب  فيها  
function cleartbody() {

    SiteName.value = "";
    SiteUrl.value = "";
    SiteCategory.value = "";
}



// function  display  all objects you store in array in tbody element in table element in html 

// بعمل  كونتينر استرنج  فاضى  مفهوش حاجه  
//بعمل لوب  بيلف على  الاراى بتاعتى ال شايله الاوبجيكتس بتاعت المواقع بكل صفاتها 
//فى كل لفه  بحط كود html الاستاتيك  جوا  backqoute واخزنه فى  الكونتينر ال كنت معرفه فى الاول  
// <td>${AllSites[i].name}</td>  معناها لحد دلوقتى انه  شايفه استرنج  وهيغير قيمة  i على حسب  اللفه  
//يعنى لو  i =1 هيروح للمصفوفه ويروح للاوبجيكت ال الاندكس بتاعه بواحد ويجيب البروبرتى بتاعته ال هيا الاسم  name ويحط قيمتها فى المكان  د وهكذا
function DisplayAllSites() {

    var html_container = '';

    for (var i = 0; i < AllSites.length; i++) {

        html_container += ` <tr>
        
        <th scope="row">${i+1}</th>
        <td>${AllSites[i].name}</td>
        <td>${AllSites[i].url}</td>
        <td>${AllSites[i].category}</td>
        <td><button class="btn visit  " onclick="visitsite(${i})"> Visit <i class="fa-solid fas fa-eye visit-icon"></i></button></td>
        <td><button class="btn edit " onclick="editsite(${i})"> Edit <i class="fa-solid fas fa-pen edit-icon "></i></button></td>
        <td><button class="btn btn-danger " onclick="deletesite(${i})"> Delete <i class="fa-solid fas fa-trash"></i></button></td>
      </tr>`

    }

    // بيروح يمسك الايلمنت  ال هوا عاوزه يعرض فيه  ال هة tbody بتاع الجدول  ويروح يقله  خد الاسترنج ال  هو الكونتينر ال فى كل  لفه بتخزن فىه الاسترن ال فى اللوب 
    //بياخد السترنج يحطه فى html code  وبعدين  يحوله  كود 

    document.getElementById("table-view").innerHTML = html_container;

}


//function edit 
// لما بضغط على زرار الايديت الداله بتتنفذ 
// بتروح ترجع القيم فى النبوت بناء على id او الاندكس بتاع الاوبجيكت البتبعتهالها فى الداله  من دالة العرض 

function editsite(item_id){ 

SiteName.value=AllSites[item_id].name;
SiteUrl.value=AllSites[item_id].url;
SiteCategory.value=AllSites[item_id].category;
document.getElementById("btn-gp").innerHTML=`<button class="submit btn  btn-info w-50 " onclick="updatesite(${item_id})">Update Site info</button>`

}

// function  
//بعد مابتعدل على دالة الايديت لما بتضغط على الزارا الايديت 
// لو عدلت القيم او معدلتش بتروح تاخد القيم الجديدة وتخزنها فى نفس الاوبجيك بالانكس بتاعه  
//وبتعرضه 
//وبتفضى الانبوت تانى 
// جزء بيجدد القيم الجزء التانى بستخدم نفس طريقة الاضافة كانه عنصر جديد بس على نفسه 

function updatesite(item_id){

    AllSites[item_id].name=SiteName.value;
    AllSites[item_id].url=SiteUrl.value;
    AllSites[item_id].category=SiteCategory.value;
    console.log(AllSites[item_id].name);
    localStorage.setItem(`Allsites`,JSON.stringify(AllSites));
    DisplayAllSites();
    cleartbody();

    
    document.getElementById("btn-gp").innerHTML=`<button class="submit btn  btn-info w-50 " onclick="submitsite()"> Submit </button>`

}


// 
function deletesite(item_id) {

// بمسح عنصر واحد باديه من الاندكس ال مبعوت ليا 
// يعنى لو مبعوت ليا Item-id=2 
// هيبدا من العنصر 2 فى المصفوفه ويمسح واحد بس ال هو العنصر التانى نفسه 
//بعدها برجع استدعى دالة العرض تلف على المصفوفه وتعرضلى  ال جواها بعد ما مسحت واح
AllSites.splice(item_id,1);
localStorage.setItem(`Allsites`,JSON.stringify(AllSites));
DisplayAllSites();

}


//function visit site 

function visitsite(item_id){

//window.location.href=AllSites[item_id].url;
window.open(AllSites[item_id].url,'_blank');

}


function searchsite(){

var textsearch=inputsearch.value;


var html_container = '';

for (var i = 0; i < AllSites.length; i++) {

    if(AllSites[i].name.toLowerCase().includes(textsearch.toLowerCase()))

{
    html_container += ` <tr>
    
    <th scope="row">${i+1}</th>
    <td>${AllSites[i].name}</td>
    <td>${AllSites[i].url}</td>
    <td>${AllSites[i].category}</td>
    <td><button class="btn visit  " onclick="visitsite(${i})"> Visit <i class="fa-solid fas fa-trash"></i></button></td>
    <td><button class="btn edit " onclick="editsite(${i})"> Edit <i class="fa-solid fas fa-trash"></i></button></td>
    <td><button class="btn btn-danger " onclick="deletesite(${i})"> Delete <i class="fa-solid fas fa-trash"></i></button></td>
  </tr>`

}

}
// بيروح يمسك الايلمنت  ال هوا عاوزه يعرض فيه  ال هة tbody بتاع الجدول  ويروح يقله  خد الاسترنج ال  هو الكونتينر ال فى كل  لفه بتخزن فىه الاسترن ال فى اللوب 
//بياخد السترنج يحطه فى html code  وبعدين  يحوله  كود 

document.getElementById("table-view").innerHTML = html_container;


    
}
