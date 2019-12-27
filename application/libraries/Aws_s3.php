<?php

class Aws_s3 {

    private $error;
    private $aws_key;
    private $aws_secret;
    private $s3;

    public function __construct() {
        include_once dirname(__FILE__) . '/aws_sns/aws-autoloader.php';
        $this->aws_key = 'AKIAXBDC73PH3KDCPMFN';
        $this->aws_secret = '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';
        $this->s3 = Aws\S3\S3Client::factory(array(
                    'credentials' => array(
                        'key' => $this->aws_key,
                        'secret' => $this->aws_secret
                    ),
                    'region' => 'us-east-2',
                    'version' => 'latest',
                    'debug' => false, // bool|array
        ));
    }

    public function fetch_list($bucket = 'files.streamy.link', $prefix = null) {
        try {
            $result = $this->s3->listObjects(array('Bucket' => $bucket, 'Prefix' => $prefix));
            $files = $result->getPath('Contents');
            $file_list = array();
            if (!empty($files) && is_array($files))
                foreach ($files as $file) {
//                    $ext = strtolower(pathinfo($file['Key'], PATHINFO_EXTENSION));
//                    if ($ext == 'pdf')
//                        $file_list[] = $file['Key'];
                    $file_list[] = $file['Key'];
                }
            return $file_list;
        } catch (Exception $e) {
            echo $e->getMessage() . "\n";
            return false;
        }
    }

    public function read_file($filename, $bucket = 'files.streamy.link') {
        try {
            $handle = fopen('php://temp/', 'wb');
            $result = $this->s3->getObject(
                    array(
                        'Bucket' => $bucket,
                        'Delimiter' => '/',
                        'Key' => $filename,
                        'SaveAs' => $handle
                    )
            );
            $body = $result->get('Body');
            $content = stream_get_contents($handle);
            return $content;
        } catch (Exception $e) {
            // if ($path == 'download')
            //echo $e->getMessage() . "\n";
            return false;
        }
    }

    public function fetch_file($filename, $path = FCPATH . 'download', $bucket = 'files.streamy.link') {
        try {
            $result = $this->s3->getObject(
                    array(
                        'Bucket' => $bucket,
                        'Delimiter' => '/',
                        'Key' => $filename,
                        'SaveAs' => $path . '/' . $filename
                    )
            );
            return $result;
        } catch (Exception $e) {
            // if ($path == 'download')
            echo $e->getMessage() . "\n";
            return false;
        }
    }

    public function move_file($sourceKeyname, $targetKeyname) {
        echo "Try moving $sourceKeyname TO, $targetKeyname\n";
        try {
            $result = $this->s3->copyObject(
                    array(
                        'Bucket' => 'files.streamy.link',
                        'Key' => $targetKeyname,
                        'CopySource' => 'files.streamy.link/' . $sourceKeyname,
                    )
            );
            return $this->delete_file($sourceKeyname);
            return $result->getMessage();
        } catch (Exception $e) {
            echo $e->getMessage() . "\n";
            return false;
        }
    }

    public function rename_file($sourceKeyname, $targetKeyname) {
        try {
            $result = $this->s3->copyObject(
                    array(
                        'Bucket' => 'files.streamy.link',
                        'Key' => $targetKeyname,
                        'CopySource' => 'files.streamy.link' . $sourceKeyname,
                    )
            );
            return $this->delete_file($sourceKeyname);
            return $result->getMessage();
        } catch (Exception $e) {
            echo $e->getMessage() . "\n";
            return false;
        }
    }

    public function delete_file($filename, $bucket = 'files.streamy.link') {
        try {
            $result = $this->s3->deleteObject(
                    array(
                        'Bucket' => $bucket,
                        'Key' => $filename
                    )
            );
            return $result;
        } catch (Exception $e) {
            echo $e->getMessage() . "\n";
            return false;
        }
    }

    public function put_file($filename) {
        try {
            $result = $this->s3->putObject(
                    array(
                        'Bucket' => 'files.streamy.link',
                        'Key' => $filename,
                        'SourceFile' => FCPATH . 'download/' . $filename,
                        'ContentType' => 'application/pdf',
                        'ACL' => 'public-read',
                        'StorageClass' => 'REDUCED_REDUNDANCY',
                        'Metadata' => array(
                            'param1' => 'value 1',
                            'param2' => 'value 2'
                        )
                    )
            );
        } catch (Exception $e) {
            echo $e->getMessage() . "\n";
            return false;
        }
    }

    public function lists() {
        echo "<pre>\n";
        error_reporting(E_ALL);
        ini_set("display_errors", 1);

        $s3 = Aws\S3\S3Client::factory(array(
                    'credentials' => array(
                        'key' => 'AKIAIZL3XSI46NFUZVEA',
                        'secret' => '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'
                    ),
                    'region' => 'us-east-1',
                    'version' => 'latest',
                    'debug' => true, // bool|array
        ));

        try {
            echo "<h1>listObjects</h1>\n";
            $result = $s3->listObjects(array(
                'Bucket' => 'files.streamy.link'
            ));
            var_dump($result);
            echo "<h1>Contents</h1>\n";
            $files = $result->getPath('Contents');
            print_r($files);

            echo "<h1>getObject</h1>\n";
            $result = $s3->getObject(
                    array(
                        'Bucket' => 'files.streamy.link',
                        'Key' => $files[0]['Key'],
                        'SaveAs' => FCPATH . 'download/demo2.pdf'
                    )
            );
            var_dump($result);
            echo "<h1>Body</h1>\n";
            $body = $result->get('Body');
            var_dump($body);
            $handle = fopen('php://temp', 'r');
            $content = stream_get_contents($handle);
            echo "My String length: " . strlen($content);

            echo "<h1>response</h1>\n";
            // Upload data.
            //$response = $s3->getIterator('ListObjects', array('Bucket' => 'files.streamy.link', 'MaxKeys' => 1000, 'Prefix' => 'files/'));
            $response = $s3->getIterator('ListObjects', array('Bucket' => 'files.streamy.link'));
            // Print the URL to the object.
            print_r($response);
            //$files = $response->getPath('Contents');
            //print_r($files);
        } catch (Exception $e) {
            echo $e->getMessage() . "\n";
        }
    }

    public function upload() {
        putenv('HOME=' . FCPATH);
        echo getenv('HOME');
        $tmp = FCPATH . 'download/demo.pdf';
        $filename = 'mynew.pdf';

        $bucket = 'files.streamy.link';
        $s3 = Aws\S3\S3Client::factory(array(
                    'credentials' => array(
                        'key' => 'AKIAIZL3XSI46NFUZVEA',
                        'secret' => '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',
                    ),
                    'bucket' => 'files.streamy.link',
                    'region' => 'us-east-1',
                    'version' => 'latest',
                    'debug' => true, // bool|array
        ));

        $s3->putBucket($bucket, S3::ACL_PUBLIC_READ);
        echo "Start Upload3";
        if ($s3->putObjectFile($tmp, $bucket, $filename, S3::ACL_PUBLIC_READ)) {
            $message = "S3 Upload Successful.";
            $s3file = 'http://' . $bucket . '.s3.amazonaws.com/' . $filename;
            echo "<img src='$s3file'/>";
            echo 'S3 File URL:' . $s3file;
        } else {
            $message = "S3 Upload Fail.";
        }
        echo $message;
    }

    public function s3push($source, $destination, $bucket = 'files.streamy.link') {
        //echo "Start Upload $destination\n";
        // Upload a file.
        try {
            $result = $this->s3->putObject(array(
                'Bucket' => $bucket,
                'Key' => $destination,
                'SourceFile' => $source,
                'ContentType' => 'text/plain',
                //'ACL' => 'public-read',
                'StorageClass' => 'STANDARD'
            ));
            //var_dump($result['ObjectURL']);
            //echo "Upload Complete $destination\n";
            return $result['ObjectURL'];
        } catch (Exception $e) {
            //echo $e->getMessage() . "\n";
            return false;
        }
    }

    public function move_file_vin($sourceKeyname, $targetKeyname) {
        //echo "Try moving $sourceKeyname TO, $targetKeyname\n";
        try {
            $result = $this->s3->copyObject(
                    array(
                        'Bucket' => 'files.streamy.link',
                        'Key' => $targetKeyname,
                        'CopySource' => 'files.streamy.link/' . $sourceKeyname,
                    )
            );
            return $this->delete_file($sourceKeyname);
            return $result->getMessage();
        } catch (Exception $e) {
            echo $e->getMessage() . "\n";
            return false;
        }
    }

    public function fetch_file2($filename, $path = FCPATH . 'download', $bucket = 'files.streamy.link', $folder = '') {
        try {
            $result = $this->s3->getObject(
                    array(
                        'Bucket' => $bucket,
                        'Delimiter' => '/',
                        'Key' => $folder . $filename,
                        'SaveAs' => $path . '/' . $filename
                    )
            );
            return $result;
        } catch (Exception $e) {
            //echo $e->getMessage() . "\n";
            return false;
        }
    }

    public function s3_put($bucket, $path, $filename, $data) {
        // Register the stream wrapper from an S3Client object
        $this->s3->registerStreamWrapper();
        //$data = file_get_contents('s3://files.streamy.link/doc.pdf');
        //echo $data;
        if (ENV != 'live')
            $path = 'dev_' . $path;
        file_put_contents('s3://' . $bucket . (!empty($path) ? '/' . $path : '') . '/' . $filename, $data);
    }

    public function s3_upload($bucket, $path, $filename, $data) {
        // Register the stream wrapper from an S3Client object
        $this->s3->registerStreamWrapper();
        $path = (ENV == 'live') ? 'PROD/' . $path : 'DEV/' . $path;
        return file_put_contents('s3://' . $bucket . (!empty($path) ? '/' . $path : '') . '/' . $filename, $data);
    }

    public function s3_get($bucket, $path, $filename) {
        // Register the stream wrapper from an S3Client object
        $this->s3->registerStreamWrapper();
        $path = (ENV == 'live') ? 'PROD/' . $path : 'DEV/' . $path;
        return file_get_contents('s3://' . $bucket . (!empty($path) ? '/' . $path : '') . '/' . $filename);
    }

    public function s3_read($bucket, $path, $filename) {
        // Register the stream wrapper from an S3Client object
        $this->s3->registerStreamWrapper();
        //$path = (ENV == 'live')?'PROD/'.$path:'DEV/'.$path;
        return file_get_contents('s3://' . $bucket . (!empty($path) ? '/' . $path : '') . '/' . $filename);
    }

    public function s3_del($bucket, $path, $filename) {
        // Register the stream wrapper from an S3Client object
        $this->s3->registerStreamWrapper();
        $path = (ENV == 'live') ? 'PROD/' . $path : 'DEV/' . $path;
        return unlink('s3://' . $bucket . (!empty($path) ? '/' . $path : '') . '/' . $filename);
    }

    public function s3_up($bucket, $path, $filename, $sourceFile) {
        $path = (ENV == 'live') ? 'PROD/' . $path : 'DEV/' . $path;
        try {
            $result = $this->s3->putObject(array(
                'Bucket' => $bucket,
                'Key' => $path . '/' . $filename,
                'SourceFile' => $sourceFile,
                'ContentType' => 'binary/octet-stream',
                'StorageClass' => 'STANDARD'
            ));
            //var_dump($result['ObjectURL']);
            //echo "Upload Complete $destination\n";
            return $result['ObjectURL'];
        } catch (Exception $e) {
            echo $e->getMessage() . "\n";
            return false;
        }
    }

}
