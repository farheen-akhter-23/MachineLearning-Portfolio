from transformers import AutoFeatureExtractor, YolosForObjectDetection
import gradio as gr
from PIL import Image
import torch
import matplotlib.pyplot as plt
import io
import numpy as np


COLORS = [[0.000, 0.447, 0.741], [0.850, 0.325, 0.098], [0.929, 0.694, 0.125],
          [0.494, 0.184, 0.556], [0.466, 0.674, 0.188], [0.301, 0.745, 0.933]]


def process_class_list(classes_string: str):
    return [x.strip() for x in classes_string.split(",")] if classes_string else []

def model_inference(img, model_name: str, prob_threshold: int, classes_to_show = str):
    feature_extractor = AutoFeatureExtractor.from_pretrained(f"hustvl/{model_name}")
    model = YolosForObjectDetection.from_pretrained(f"hustvl/{model_name}")

    img = Image.fromarray(img)

    pixel_values = feature_extractor(img, return_tensors="pt").pixel_values

    with torch.no_grad():
        outputs = model(pixel_values, output_attentions=True)

    probas = outputs.logits.softmax(-1)[0, :, :-1]
    keep = probas.max(-1).values > prob_threshold

    target_sizes = torch.tensor(img.size[::-1]).unsqueeze(0)
    postprocessed_outputs = feature_extractor.post_process(outputs, target_sizes)
    bboxes_scaled = postprocessed_outputs[0]['boxes']

    classes_list = process_class_list(classes_to_show)
    return plot_results(
        img, probas[keep], bboxes_scaled[keep], model, classes_list
    )

def plot_results(pil_img, prob, boxes, model, classes_list):
    plt.figure(figsize=(16,10))
    plt.imshow(pil_img)
    ax = plt.gca()
    colors = COLORS * 100
    for p, (xmin, ymin, xmax, ymax), c in zip(prob, boxes.tolist(), colors):
        cl = p.argmax()
        object_class = model.config.id2label[cl.item()]
        
        if len(classes_list) > 0 :
            if object_class not in classes_list:
                continue
            
        ax.add_patch(plt.Rectangle((xmin, ymin), xmax - xmin, ymax - ymin,
                                fill=False, color=c, linewidth=3))
        text = f'{object_class}: {p[cl]:0.2f}'
        ax.text(xmin, ymin, text, fontsize=15,
                bbox=dict(facecolor='yellow', alpha=0.5))
    plt.axis('off')
    return fig2img(plt.gcf())
    
def fig2img(fig):
    buf = io.BytesIO()
    fig.savefig(buf)
    buf.seek(0)
    return Image.open(buf)

description = """
Do you want to see what objects are in your images? Try our object detection app, powered by YOLOS, a state-of-the-art algorithm that can find and name multiple objects in a single image. 
You can upload or drag and drop an image file to detect objects using YOLOS models. 
You can also choose from different YOLOS models, adjust the probability threshold, and select the classes to use for detection. 
Our app will show you the results in an interactive image with bounding boxes and labels for each detected object. 
You can also download the results as an image file. Our app is fast, accurate, and easy to use. 
Try it now and discover the power of object detection! 😊
"""

image_in = gr.components.Image()
image_out = gr.components.Image()
model_choice = gr.components.Dropdown(["yolos-tiny", "yolos-small", "yolos-base", "yolos-small-300", "yolos-small-dwr"], value="yolos-small", label="YOLOS Model")
prob_threshold_slider = gr.components.Slider(minimum=0, maximum=1.0, step=0.01, value=0.9, label="Probability Threshold")
classes_to_show = gr.components.Textbox(placeholder="e.g. person, car , laptop", label="Classes to use (Optional)")

Iface = gr.Interface(
    fn=model_inference,
    inputs=[image_in,model_choice, prob_threshold_slider, classes_to_show],
    outputs=image_out,
    title="Object Detection With YOLO",
    description=description,
    theme='HaleyCH/HaleyCH_Theme',
).launch()