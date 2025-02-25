import { providers, useSession } from "next-auth/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FacebookIcon, FacebookShareButton } from "react-share";
import ArticleCarouselLayout from "../../components/ArticlesCarousel/ArticleCarouselLayout";
import Footer from "../../components/Footer";
import ModalLayout from "../../components/HomePage/ModalLayout";
import MobileNavbar from "../../components/HomePage/NavBar/MobileNavBar";
import NavBar from "../../components/NavBar";
import { usePostHttp } from "../../hooks/postHttp";
import { useUserManagementHook } from "../../hooks/userManagementHook";
import { DoLogin } from "../../redux/actions/UserAction";

export default function LearningInTheDigitalAge(props) {
  useUserManagementHook();
  const dispatch = useDispatch();

  const [session, loading] = useSession();

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const user = useSelector((state) => state.UserReducer);

  const [toLogin, setToLogin] = useState(false);

  const [authLoginLoading, authData] = usePostHttp(
    !user.isLogin && session && toLogin
      ? { name: session.user.name, email: session.user.email }
      : null,
    toLogin ? "/login/auth" : null
  );

  useEffect(() => {
    if (session) {
      setToLogin(true);
    }
  }, [session]);

  useEffect(() => {
    if (authData.success) {
      setLoginModalOpen(false);
      dispatch(DoLogin(true, authData.result));
    }
  }, [authData]);

  useEffect(() => {
    if (user.data && !user.data.verified) setLoginModalOpen(true);
  }, [user]);

  return (
    <>
      <Head>
        <title>
          Learning in the Digital Age: Gearing Towards Education 4.0 - Stock
          Knowledge
        </title>
        <meta
          property="og:url"
          content={`${process.env.WEBSITE_DOMAIN}/articles/learning-in-the-digital-age`}
        />
        <meta property="og:type" content="article" />
        <meta property="fb:app_id" content={process.env.FACEBOOK_ID} />
        <meta
          property="og:title"
          content={`Learning in the Digital Age: Gearing Towards Education 4.0 - ${process.env.WEBSITE_NAME}`}
        />
        <meta
          property="og:description"
          content="Learning in the Digital Age: Gearing Towards Education 4.0"
        />
        <meta
          property="og:image"
          content={`${process.env.WEBSITE_DOMAIN}/images/articles/learning-in-the-digital-age/header-img.svg`}
        />
      </Head>
      {loginModalOpen && (
        <ModalLayout
          providers={props.providers}
          showModal={setLoginModalOpen}
        />
      )}
      <MobileNavbar />
      <NavBar
        page="article"
        path="Learning in the Digital Age: Gearing Towards Education 4.0"
        showModal={setLoginModalOpen}
      />
      <div className="hero text-white px-20 py-10 space-y-2 md:w-full xs:w-screen">
        <h1 className="xl:text-6xl lg:text-6xl md:text-6xl sm:text-xl xs:text-xl xl:w-3/4 lg:w-3/4 md:w-3/4 reno:w-3/4 sm:w-full xs:w-full font-bold">
          Learning in the Digital Age: Gearing Towards Education 4.0
        </h1>
        <p className="text-sm">By: Rome Salonga </p>
      </div>
      <div className="md:-mt-5 xs:-mt-4 md:mb-8 xl:w-full lg:w-full md:w-full reno:w-full sm:w-screen xs:w-screen">
        <img
          className="mx-auto w-3/4"
          src="/images/articles/learning-in-the-digital-age/header-img.svg"
        />
      </div>
      <div className="md:w-full xs:w-screen flex justify-between lg:px-48 md:px-20 reno:px-20 sm:px-20 xs:px-20 text-gray-500 lg:flex-row xs:flex-col">
        <div className="xl:w-1/4 lg:w-1/4 md:w-1/4 reno:w-1/4 sm:w-full xs:w-full">
          <p>Share this article</p>
          <FacebookShareButton url="http://localhost:3000/articles/learning-in-the-digital-age">
            <FacebookIcon size={36} />
          </FacebookShareButton>
        </div>
        <div className="xl:w-11/12 lg:w-11/12 md:w-11/12 reno:w-11/12 sm:w-full xs:w-full leading-relaxed">
          <p className="leading-relaxed">
            On the 18th of November 2019, Stock Knowledge made an anticipated
            visit to the University of the Philippines Los Baños to further
            expand the coverage of the company’s target learners. The company’s
            CEO and founder Ms. Anna Marie Benzon, herself, led the conference.
            Technology enhanced learning was the main subject matter of the
            talk, focusing on how traditional teaching is no longer effective
            for the newer generation and turning to the usage of technology as a
            substitute would be a potent solution.
            <br />
            <br />
            Science, for example, is a subject that students are interested in,
            but is a hard one to take into comprehension. Sometimes just sitting
            in a class and listening to your teacher can be too tedious that
            you’d rather learn about gravity on your own by falling on the
            ground head first. Gamified Learning Tool (GLT) is the way to avoid
            that, having fun while enhancing your knowledge is now possible
            thanks to Science.
          </p>
          <img
            className="mx-auto mt-8"
            src="/images/articles/learning-in-the-digital-age/image-1.svg"
          />
          <p className="text-xs leading-tight">
            PStock Knowledge goes to the University of the Philippines Rural
            High School to share the latest EdTech that most digitally savvy
            learners enjoy and discussing on how to maximize 21st-century
            technologies to teach and learn STEM subjects.
          </p>
        </div>
      </div>
      <div className="">
        <ArticleCarouselLayout />
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  return { props: { providers: await providers(context) } };
}
