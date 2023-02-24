import { useState } from "react";
import CardComponent from "../card/card.component";
import axiosInterCep from "@/lib/axios";
import { useRouter } from "next/router";
interface Props {
  setOpenModalCreate: (value: boolean) => void;
}

const CreatePomodoros = (props: Props) => {

  const router = useRouter();

  const [pomodoroName, setPomodoroName] = useState<string>("");

  const [tagList, setTagList] = useState<string[]>([]);

  const [continueToTemplate, setContinueToTemplate] = useState<boolean>(false);

  const [selectTemplate, setSelectTemplate] = useState<string>("");

  const [error, setError] = useState<any>({
    pomodoroName: "",
  });

  const addTag = (e: any) => {
    e.preventDefault();
    //get input value
    if (e.target.tags.value === "") return;
    const tag = e.target.tags.value;
    //set to taglist
    //check if tag is already in taglist
    if (tagList.includes(tag)) {
      e.target.tags.value = "";
      return;
    }
    setTagList([...tagList, tag]);
    //clear input
    e.target.tags.value = "";
  };

  const removeTag = (index: Number) => {
    //get input value
    const newTagList = tagList.filter((tag, i) => i !== index);
    setTagList(newTagList);
  };

  const clearError = () => {
    setError({
      ["pomodoroName"]: "",
    });
  };

  const btnContinue = () => {
    //clear error
    clearError();
    //check pomodoro name
    if (pomodoroName === "") {
      setError({
        ["pomodoroName"]: "Pomodoro name is required",
      });
      return;
    }

    //check if taglist is empty
    // if (tagList.length === 0) return;
    //set continue to template to true
    setContinueToTemplate(true);
  };

  //function create pomodoro
  const createPomodoro = async () => {
    //check if template is selected
    if (selectTemplate === "") return;
    //create pomodoro
    console.log("create pomodoro");
    //close modal
    try {
      const data = await axiosInterCep
        .post(`/pomodoro/create`, {
          pomodoroName: pomodoroName,
          templateId: selectTemplate,
          tag: tagList,
        })
        .then((res) => res.data);
      console.log(data);
      if(data.status === "success"){
        router.push(`/dashboard/pomodoro/edit/${data.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (continueToTemplate) {
    return (
      <div
        className="fixed z-30 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* black screen */}
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          {/* modal space on top */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start w-full">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3
                    className="text-3xl font-medium text-gray-900"
                    id="modal-title"
                  >
                    Choose a template
                  </h3>
                  <div className="mt-5 w-full">
                    {/* card with grid */}
                    <div className="grid grid-cols-3 gap-4">
                      <CardComponent
                        templateId="1"
                        selectTemplateId={selectTemplate}
                        setSelectTemplateId={setSelectTemplate}
                      />
                      <CardComponent
                        templateId="2"
                        selectTemplateId={selectTemplate}
                        setSelectTemplateId={setSelectTemplate}
                      />
                      <CardComponent
                        templateId="3"
                        selectTemplateId={selectTemplate}
                        setSelectTemplateId={setSelectTemplate}
                      />
                      <CardComponent
                        templateId="4"
                        selectTemplateId={selectTemplate}
                        setSelectTemplateId={setSelectTemplate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={createPomodoro}
              >
                Create
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={(e) => props.setOpenModalCreate(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    // modal
    <div
      className="fixed z-30 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* black screen */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        {/* modal space on top */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start w-full">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  className="text-3xl font-medium text-gray-900"
                  id="modal-title"
                >
                  Create Pomodoro
                </h3>
                <div className="mt-2 w-full">
                  {/* detail */}
                  <p>Pomodoro Name</p>
                  {/* input */}
                  <input
                    type="text"
                    name="pomodoroName"
                    id="pomodoroName"
                    onChange={(e) => setPomodoroName(e.target.value)}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-purple-500 block w-full sm:text-sm ${
                      error["pomodoroName"]
                        ? "border-red-600"
                        : "border-purple-600"
                    } border rounded-md px-5 py-2 mb-2`}
                    placeholder="Pomodoro"
                  />
                  {/* error */}
                  {error["pomodoroName"] && (
                    <p className="text-red-600 text-xs -mt-2">
                      {error["pomodoroName"]}
                    </p>
                  )}
                  <p>Tag</p>
                  <form
                    onSubmit={addTag}
                    className="flex space-x-3 items-center"
                  >
                    <div className="w-10/12">
                      <input
                        type="text"
                        name="tags"
                        id="tags"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-purple-500 block w-full sm:text-sm border-purple-600 border rounded-md px-5 py-2"
                        placeholder="Add tag , ex: study, work, lofi [Optional]"
                      />
                    </div>
                    <div className="w-2/12 h-full text-right">
                      {/* btn add */}
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-8 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm h-full"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
                {/* loop tag list */}
                <div className="mt-2 w-full flex flex-wrap">
                  {tagList.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-xs px-3 mb-2 bg-purple-500 text-white py-1 rounded-md mr-2 cursor-pointer"
                      onClick={() => removeTag(index)}
                    >
                      <p>{tag}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={btnContinue}
            >
              Continue
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={(e) => props.setOpenModalCreate(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePomodoros;
