import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
 return (
  <div id="wd-dashboard">
   <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
   <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
   <div id="wd-dashboard-courses">
    <div className="wd-dashboard-course">
     <Link href="/courses/1234" className="wd-dashboard-course-link">
      <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
      <div>
       <h5> CS1234 React JS </h5>
       <p className="wd-dashboard-course-title">
        Full Stack software developer
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
    <div className="wd-dashboard-course">
     <Link href="/courses/2567" className="wd-dashboard-course-link">
      <Image src="/images/python.jpg" width={200} height={150} alt="python" />
      <div>
       <h5> CS2567 Python Programming </h5>
       <p className="wd-dashboard-course-title">
        Backend Development Essentials
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
    <div className="wd-dashboard-course">
     <Link href="/courses/3890" className="wd-dashboard-course-link">
      <Image src="/images/database.jpg" width={200} height={150} alt="database" />
      <div>
       <h5> CS3890 Database Design </h5>
       <p className="wd-dashboard-course-title">
        SQL and NoSQL Fundamentals
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
    <div className="wd-dashboard-course">
     <Link href="/courses/4123" className="wd-dashboard-course-link">
      <Image src="/images/webdesign.jpg" width={200} height={150} alt="webdesign" />
      <div>
       <h5> CS4123 Web Design </h5>
       <p className="wd-dashboard-course-title">
        UI/UX and Frontend Design
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
    <div className="wd-dashboard-course">
     <Link href="/courses/5456" className="wd-dashboard-course-link">
      <Image src="/images/algorithms.jpg" width={200} height={150} alt="algorithms" />
      <div>
       <h5> CS5456 Algorithms </h5>
       <p className="wd-dashboard-course-title">
        Data Structures and Analysis
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
    <div className="wd-dashboard-course">
     <Link href="/courses/6789" className="wd-dashboard-course-link">
      <Image src="/images/machinelearning.jpg" width={200} height={150} alt="machinelearning" />
      <div>
       <h5> CS6789 Machine Learning </h5>
       <p className="wd-dashboard-course-title">
        AI and Neural Networks
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
    <div className="wd-dashboard-course">
     <Link href="/courses/7012" className="wd-dashboard-course-link">
      <Image src="/images/cloudcomputing.jpg" width={200} height={150} alt="cloudcomputing" />
      <div>
       <h5> CS7012 Cloud Computing </h5>
       <p className="wd-dashboard-course-title">
        AWS and Distributed Systems
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
   </div>
  </div>
);}
