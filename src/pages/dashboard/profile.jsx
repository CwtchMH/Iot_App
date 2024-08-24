import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { projectsData } from "@/data";

export function Profile() {
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="../img/profile-img.jpg"
                alt="image"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  Nguyen Manh Hieu
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  Student
                </Typography>
              </div>
            </div>
            <div className="w-96">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Excited
                  </Tab>
                  <Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Free
                  </Tab>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Work
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <ProfileInfoCard
                title="Some things about me..."
                description="Hi, I'm Manh Hieu, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              />
            </div>
            <div className="flex justify-center">
              <ProfileInfoCard
                title="Profile Information"
                details={{
                  Class: "D21CNPM02",
                  "Student code": "B21DCCN364",
                  mobile: "0931778727",
                  email: "nmhhieuk2@gmail.com",
                  social: (
                    <div className="flex items-center gap-4">
                      <i className="fa-brands fa-facebook text-blue-700" />
                      <i className="fa-brands fa-twitter text-blue-400" />
                      <i className="fa-brands fa-instagram text-purple-500" />
                    </div>
                  ),
                }}
              />
            </div>
            <div className="">
              <ProfileInfoCard
                title="Documents"
                details={{
                  "API docs": "",
                  PDF: "",
                }}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
