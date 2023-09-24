var d = new Date();

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// document.getElementById('wday').innerHTML = ("Happy " + days[d.getDay()] + "!<br><br>Please, get vaxxed, and wear a mask. Save Lives.");



// const mouse = document.querySelector('.mouse');
// document.addEventListener('mousemove', e => {
// 	let {
// 		clientX: x,
// 		clientY: y
// 	} = e;

// 	mouse.style.transform = `translate(
// 		${x - mouse.offsetWidth / 2}px,
// 		${y - mouse.offsetHeight / 2}px
// 	)`;

// });

const query = `
{
  user(username:"sujits") {
    publication {
      posts(page: 0) {
        title
        brief
        slug
		totalReactions
        dateAdded
      }
    }
  }
}`;
async function getData() {
	const response = await fetch("https://api.hashnode.com", {
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			query: query
		})
	});
	const body = await response.json();
	let html = "";
	body.data.user.publication.posts.forEach((post) => {
		html += `<div class="flex__grid_blogs flex__grid--item_blog">  	
	<h4>${post.title}</h4>
	<p style ="text-align:justify;padding:15px;">${post.brief.slice(0,150)}
	</p>

	<h4><a class="blog-title" href="https://blog.sujits.com/${post.slug}">Read More</a></h4>
	<div class="row" style ="
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
	  ">
		<div class="block" style="padding:25px;font-size:22px;color:#1f2283">	<h5 style ="">${post.totalReactions}  👏 </h5>
		</div>
		<div class="block"style="padding:25px;font-size:20px;color:#1f2283">	<h5 style=" font-size:20px;"> 📅  ${post.dateAdded.slice(0,10) } </h5>
		</div>
  	</div>
	
 </div>
	`
	});
	// html = `${html} `;
	document.getElementById("app").innerHTML = html;
}

getData();