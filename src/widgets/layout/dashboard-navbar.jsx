import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Option,
  IconButton,
  Breadcrumbs,
  Input,
  Select
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { useSearch } from '@/context/SearchContext';
import { useEffect } from 'react';

export function DashboardNavbar() {
  const { searchTerm, setSearchTerm, searchType, setSearchType } = useSearch();

  const handleSearchTypeChange = (value) => {
    setSearchType(value);
    // Optionally, you can also reset the search term when changing the type
    setSearchTerm('');
  };

  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  useEffect(() => {
    setSearchTerm('');
    setSearchType('');
  }, [page]);

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex justify-end w-[40%] gap-36">
          <div
            className={`mr-auto md:mr-4 md:w-64 ${
              page === "home" || page === "profile" ? "hidden" : "visible"
            } flex flex-row items-center gap-32`}
          >
            <div className="w-10 mr-10">
              {page === "data-sensors" && (
                <Select 
                  label="Type" 
                  value={searchType} 
                  onChange={handleSearchTypeChange}
                >
                  <Option value="temperature">Temperature</Option>
                  <Option value="humidity">Humidity</Option>
                  <Option value="light">Light</Option>
                  <Option value="createdAt">Time</Option>
                </Select>
              )}
              {page === "action-history" && (
                <Select 
                  label="Type" 
                  value={searchType} 
                  onChange={handleSearchTypeChange}
                >
                  <Option value="AC">AC</Option>
                  <Option value="Fan">Fan</Option>
                  <Option value="Light">Light</Option>
                  <Option value="createdAt">Time</Option>
                </Select>
              )}
            </div>
            <div>
              <Input
                type={page === "data-sensors" && searchType !== "createdAt" ? "number" : ""}
                label="Search" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
