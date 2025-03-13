"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Edit,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useState } from "react";

interface FileItem {
  id: number;
  name: string;
  cid: string;
  size: string;
  creationDate: string;
  selected: boolean;
}

export default function FileListing() {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: 1,
      name: "aaa.png",
      cid: "bafyb...ntiyq",
      size: "1.77 MB",
      creationDate: "3/10/2025",
      selected: false,
    },
    {
      id: 2,
      name: "4778523339_5739952857950095_2...",
      cid: "bafkr...5vkse",
      size: "120.09 KB",
      creationDate: "3/10/2025",
      selected: false,
    },
    {
      id: 3,
      name: "carbon (2).png",
      cid: "bafkr...iv4lq",
      size: "155.30 KB",
      creationDate: "3/10/2025",
      selected: false,
    },
    {
      id: 4,
      name: "4764176933_1347907963291021_3...",
      cid: "bafkr...mebxm",
      size: "120.09 KB",
      creationDate: "3/10/2025",
      selected: false,
    },
    {
      id: 5,
      name: "carbon (3).png",
      cid: "bafkr...domzq",
      size: "160.31 KB",
      creationDate: "3/10/2025",
      selected: false,
    },
    {
      id: 6,
      name: "carbon (17).png",
      cid: "bafkr...wffjy",
      size: "69.75 KB",
      creationDate: "3/10/2025",
      selected: false,
    },
    {
      id: 7,
      name: "bbb.png",
      cid: "bafkr...wesnu",
      size: "199.85 KB",
      creationDate: "3/10/2025",
      selected: false,
    },
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setFiles(files.map((file) => ({ ...file, selected: newSelectAll })));
  };

  const toggleSelectFile = (id: number) => {
    setFiles(
      files.map((file) =>
        file.id === id ? { ...file, selected: !file.selected } : file
      )
    );
    // Update selectAll state based on if all files are selected
    const allSelected = files.every((file) =>
      file.id === id ? !file.selected : file.selected
    );
    setSelectAll(allSelected);
  };

  const toggleDropdown = (id: number) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleEdit = (id: number) => {
    console.log(`Edit file with id: ${id}`);
    setActiveDropdown(null);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete file with id: ${id}`);
    setFiles(files.filter((file) => file.id !== id));
    setActiveDropdown(null);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    if (activeDropdown !== null) {
      setActiveDropdown(null);
    }
  };

  return (
    <div className="w-full bg-gray-50 p-4" onClick={handleClickOutside}>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  CID
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Size
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Creation Date <span className="inline-block ml-1">↓</span>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  File ID
                </th>
                <th scope="col" className="relative px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={file.selected}
                        onChange={() => toggleSelectFile(file.id)}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {file.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600">
                    {file.cid}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {file.size}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {file.creationDate}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-gray-400 hover:text-gray-500">
                      <Copy className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium relative">
                    <button
                      className="text-gray-400 hover:text-gray-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(file.id);
                      }}
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === file.id && (
                      <div
                        className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <button
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                            role="menuitem"
                            onClick={() => handleEdit(file.id)}
                          >
                            <Edit
                              className="mr-3 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            Edit
                          </button>
                          <button
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-700 w-full text-left"
                            role="menuitem"
                            onClick={() => handleDelete(file.id)}
                          >
                            <Trash
                              className="mr-3 h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex items-center">
            <span className="text-sm text-gray-700">Rows per page:</span>
            <div className="ml-2 relative">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                id="rows-menu"
                aria-expanded="true"
                aria-haspopup="true"
              >
                {rowsPerPage}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-4">
              Page {currentPage}
            </span>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Help button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
