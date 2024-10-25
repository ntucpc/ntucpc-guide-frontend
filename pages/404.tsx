import { ContentBody, Layout } from "@/components/layout";
import { H1Title } from "@/ntucpc-website-common-lib/components/basic";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Pages() {
    return (<Layout title="404 Not Found" gaId="">
        <ContentBody>
            <div className="text-center my-20">

                <FontAwesomeIcon className="text-9xl text-rose-500"
                    icon={faBan} />

                <div className="text-3xl font-semibold my-5">
                    404 Not Found
                </div>

                喔不，你走錯地方了！
            </div>
        </ContentBody>
    </Layout>);
}