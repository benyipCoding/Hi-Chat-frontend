import { AppDispatch, RootState } from '@/store';
import {
  Modal,
  ModalProps,
  Upload,
  UploadFile,
  UploadProps,
  notification,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toggleProfileModalVisible } from '@/store/profileSlice';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import { RcFile } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
// import { toast } from 'react-toastify';

const ProfileModal = () => {
  const { profileModalVisible, modalTitle } = useSelector(
    (state: RootState) => state.profile
  );
  const dispatch = useDispatch<AppDispatch>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onCancelUploadAvatar = () => {
    setFileList([]);
    dispatch(toggleProfileModalVisible(false));
  };

  const onConfirmUploadAvatar = () => {
    console.log(fileList);
  };
  // const [api, contextHolder] = notification.useNotification();

  const modalProps: ModalProps = {
    title: (
      <p className="relative px-3 text-lg text-slate-800">
        <span className="w-[5px] h-[80%] absolute left-0 rounded-full top-[50%] translate-y-[-50%] bg-[#0284c7]"></span>
        {modalTitle}
      </p>
    ),
    open: profileModalVisible,
    closeIcon: false,
    footer: (
      <>
        <motion.button
          className="text-[#0284c7] py-1 px-3 rounded-md border mr-3 border-[#0284c7]"
          whileTap={{ scale: 0.9 }}
          onClick={onCancelUploadAvatar}
        >
          Cancel
        </motion.button>
        <motion.button
          className="bg-[#0284c7] text-white py-1 px-3 rounded-md"
          whileTap={{ scale: 0.9 }}
          onClick={onConfirmUploadAvatar}
        >
          Confirm
        </motion.button>
      </>
    ),
    centered: true,
  };

  const uploadProps: UploadProps = {
    accept: 'image/jpeg, image/png',
    beforeUpload(file) {
      const reg = /^image/;
      if (!reg.test(file.type)) {
        notification.error({
          message: 'File Type Error',
          description: 'Please check your file type.',
          duration: 3,
        });
        setTimeout(() => {
          setFileList([]);
        });
        return Promise.reject();
      }
      if (file.size > 2 * 1024 * 1024) {
        notification.error({
          message: 'File Size Error',
          description: 'Upload file size must be less then 2MB',
          duration: 3,
        });
        setTimeout(() => {
          setFileList([]);
        });
        return Promise.reject();
      }
    },
    onChange(info) {
      const file = [...info.fileList];
      if (!file[0]) return;
      file[0].status = 'done';
      setFileList(file);
    },
    onRemove() {
      setFileList([]);
    },

    maxCount: 1,
    listType: 'picture-card',
    fileList,
    onPreview: async (file) => {
      let src = file.url as string;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj as RcFile);
          reader.onload = () => resolve(reader.result as string);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    },
  };

  const onModalCancel = () => {
    setTimeout(() => {
      setFileList([]);
    }, 0);
  };

  return (
    <Modal {...modalProps}>
      <div className="h-[11vh] my-10">
        <ImgCrop
          rotationSlider
          showReset
          onModalCancel={onModalCancel}
          showGrid
        >
          <Upload
            // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            className="text-black"
            {...uploadProps}
          >
            {fileList.length < 1 && (
              <PlusOutlined className="text-3xl text-gray-400" />
            )}
          </Upload>
        </ImgCrop>
      </div>
    </Modal>
  );
};

export default ProfileModal;
